//  Assertion Library
import { assertEquals } from 'https://deno.land/std@0.121.0/testing/asserts.ts'

//  Functions to test
import { interpret, compile } from './mod.ts'

//  ========
//  INTERPET
//  ========

Deno.test('Interpret template with a single variable', () => {
    const template = 'Hello {{ name }}!'
    const data = { name: 'Shresht' }
    assertEquals(interpret(template, data), 'Hello Shresht!')
})

Deno.test('Interpret template with multiple variables', () => {
    const template = 'Hello {{ name }}!, I am {{ age }} years old.'
    const data = { name: 'Shresht', age: 117 }
    assertEquals(interpret(template, data), 'Hello Shresht!, I am 117 years old.')
})

//  =======
//  COMPILE
//  =======

Deno.test('Compile template with a single variable', () => {
    const template = 'Hello {{ name }}!'
    const data = { name: 'Shresht' }
    const render = compile(template)
    assertEquals(render(data), 'Hello Shresht!')
})

Deno.test('Compile template with a multiple variables', () => {
    const template = 'Hello {{ name }}!, I am {{ age }} years old.'
    const data = { name: 'Shresht', age: 117 }
    const render = compile(template)
    assertEquals(render(data), 'Hello Shresht!, I am 117 years old.')
})

//  ==============
//  EXECUTION TIME
//  ==============

/**
 * Reports the execution time for the given function
 * @param fn Function to measure execution time of
 * @param args Arguments to pass to the function
 */
//@ts-ignore: Fuction signature could be anything the user specifies
function time<T extends Array>(fn: (...args: T) => void, ...args: T) {
    const label = `Time to execute 1M ${fn.name} calls`
    console.time(label)
    fn(...args)
    console.timeEnd(label)
}

const ITERATIONS = 1_000_000
const template = 'Hello {{ name }}!'.repeat(ITERATIONS)
const data = { name: 'Shresht' }

time(interpret, template, data)

const render = compile(template)
time(render, data)