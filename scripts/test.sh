#!/bin/bash

DAY=$1
if [ -z $DAY ]; then
    jest --passWithNoTests ./test/
else
    jest --passWithNoTests ./test/${DAY}.test.ts
fi
