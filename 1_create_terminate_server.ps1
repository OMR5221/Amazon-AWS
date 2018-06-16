$ErrorActionPreference = "Stop"  # Abort if the command fails

# Get the ID of Amazon Linux Amazon Machine Image (AMI) instance:
$AMIID=aws ec2 describe-images --filters "Name=description,
Values=Amazon Linux AMI 2015.03.? x86_64 HVM GP2" --query "Images[0].ImageId" --output text # Query field in JSON 

# Get the default Virtual Private Cloud (VPC) ID:
$VPCID=aws ec2 describe-vpcs --filter "Name=isDefault, Values=true" --query "Vpcs[0].VpcId" --output text

# Get the default subnet ID (Typically a mask to allow us to generate partitions in the network):
$SUBNETID=aws ec2 describe-subnets --filters "Name=vpc-id, Values=$VPCID" --query "Subnets[0].SubnetId" --output text

# Create a security group:
$SGID=aws ec2 create-security-group --group-name mysecuritygroup --description "My Security Group" --vpc-id $VPCID --output text

# Allow inbound SSH connections: Could connect through Putty?
aws ec2 authorize-security-group-ingress --group-id $SGID --protocol tcp --port 22 --cidr 0.0.0.0/0

# Create and start the server:
$INSTANCEID=aws ec2 run-instances --image-id $AMIID --key-name mykey --instance-type t2.micro --security-group-ids $SGID --subnet-id $SUBNETID --query "Instances[0].InstanceId" --output text

# Wait until the server is started:
Write-Host "waiting for $INSTANCEID ..."
aws ec2 wait instance-running --instance-ids $INSTANCEID

# Get the public name of the server:
$PUBLICNAME=aws ec2 describe-instances --instance-ids $INSTANCEID --query "Reservations[0].Instances[0].PublicDnsName" --output text

# Output logs during script run:
Write-Host "$INSTANCEID is accepting SSH under $PUBLICNAME"
Write-Host "Connect to $PUBLICNAME via SSH as user ec2-user"
Write-Host "Press [Enter] key to terminate $INSTANCEID ..."
Read-Host
# Terminate the server:
aws ec2 terminate-instances --instance-ids $INSTANCEID
Write-Host "Terminating $INSTANCEID .."
# Wait until the server is terminated:
aws ec2 wait instance-terminated --instance-ids $INSTANCEID

# Delete the security groups:
aws ec2 delete-security-group --group-id $SGID