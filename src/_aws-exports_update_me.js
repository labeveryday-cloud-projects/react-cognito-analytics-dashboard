const awsmobile = {
    aws_project_region: "AWS-REGION",
    aws_cognito_region: "AWS-REGION",
    aws_user_pools_id: "YOUR COGNITO USER POOL ID",
    aws_user_pools_web_client_id: "YOUR COGNITO USER POOL APP CLIENT ID",
    aws_cloud_logic_custom: [
        {
            name: 'API-NAME',
            endpoint: 'https://my-api.execute-api.us-east-1.amazonaws.com/stage/',
            region: 'us-east-1',
        }
        ]
    };

export default awsmobile;