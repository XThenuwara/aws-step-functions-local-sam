# AWS Step Functions Local Test Using SAM

## Run Step Functions Local
```
docker run -p 8083:8083 --env-file step-function.env amazon/aws-stepfunctions-local
```


## commands

1. Create state machine
```
aws stepfunctions create-state-machine \
    --endpoint http://localhost:8083 \
    --name "MyStateMachine" \
    --definition file://smd.json \
    --role-arn arn:aws:iam::123456789012:role/DummyRole
```


2. list state machines
```
aws stepfunctions list-state-machines --endpoint http://localhost:8083
```


3. start execution
```
aws stepfunctions start-execution \
    --endpoint http://localhost:8083 \
    --state-machine-arn arn:aws:states:ap-southeast-1:<ACCOUNTID>:stateMachine:MyStateMachine \
    --input '{"name": "Yasas"}'
```


4. list executions
```
aws stepfunctions list-executions \
    --endpoint http://localhost:8083 \
    --state-machine-arn arn:aws:states:local:<ACCOUNTID>:stateMachine:MywStateMachine
```


HTTP Task execution is not supported in local mode.
`"Resource": "arn:aws:states:::http:invoke",` this is not supported in aws step functions local in https://hub.docker.com/layers/amazon/aws-stepfunctions-local/2.0.0/images/sha256-e03d7a9862e4cf6aef07bab5e0c13907b8ab3e9e6b56565bbc89ae22ed61ac97, latest version to date.

it will throw following error

```
2025-05-19 05:01:11.601: arn:aws:states:ap-southeast-1:841162690403:execution:APICALLDEF:05b3a8c4-5ea8-40a3-bc00-65e966e448d8 : {"Type":"ExecutionFailed","PreviousEventId":2,"ExecutionFailedEventDetails":{"Error":"States.Runtime","Cause":"An error occurred while scheduling the state 'CallAPI'. The provided ARN 'arn:aws:states:ap-southeast-1:841162690403:http:invoke' is invalid."}}
```
