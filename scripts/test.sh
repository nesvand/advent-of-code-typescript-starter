#!/bin/bash

DAY=$1
if [ -z $DAY ]; then
    jest --
else
    jest ./test/${DAY}.test.ts
fi
