const express=require('express')
const cors=require('cors')
const morgan=require('morgan')

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())