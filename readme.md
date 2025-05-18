# AWS Step Functions Local Test Using SAM

## Run Step Functions Local
```
docker run -p 8083:8083 --env-file step-function.env amazon/aws-stepfunctions-local
```


## commands

1. Create state machine
```
aws stepfunctions create-state-machine \   ✘ INT 5s 06:45:31 PM
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
aws stepfunctions start-execution \                                ✘ INT 8s 06:50:26 PM
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