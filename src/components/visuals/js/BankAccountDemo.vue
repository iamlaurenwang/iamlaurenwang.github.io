<script setup lang="ts">
import { reactive, ref } from 'vue'
import CodeSnippet from '@/components/visuals/CodeSnippet.vue'

/**
 * The closure being taught: `balance` lives inside createBankAccount and is
 * unreachable from the outside — the only way to touch it is the returned
 * methods. Each call produces an independent scope, so A / B / C never mix.
 */
interface BankAccount {
  deposit: (amount: number) => number
  withdraw: (amount: number) => number
}

function createBankAccount(initBalance: number): BankAccount {
  let balance = initBalance // private — closed over, no external access
  return {
    deposit(amount) {
      balance += amount
      return balance
    },
    withdraw(amount) {
      balance -= amount
      return balance
    },
  }
}

type AccountId = 'A' | 'B' | 'C'

const accounts: Record<AccountId, BankAccount> = {
  A: createBankAccount(2000),
  B: createBankAccount(350),
  C: createBankAccount(0),
}

// These refs only *mirror* the private balances for display.
const balances = reactive<Record<AccountId, number>>({ A: 2000, B: 350, C: 0 })

const ids: AccountId[] = ['A', 'B', 'C']
const selected = ref<AccountId>('A')
const amount = ref<number>(100)
const flash = ref<AccountId | null>(null)

function transact(type: 'deposit' | 'withdraw'): void {
  const value = Number(amount.value)
  if (!value || value <= 0) return
  const id = selected.value
  balances[id] = type === 'deposit' ? accounts[id].deposit(value) : accounts[id].withdraw(value)
  flash.value = id
  window.setTimeout(() => (flash.value = null), 400)
}

const code = `function createBankAccount(initBalance) {
  let balance = initBalance        // private, closed over
  return {
    deposit(amount)  { balance += amount; return balance },
    withdraw(amount) { balance -= amount; return balance },
  }
}

const accountA = createBankAccount(2000)  // own balance
const accountB = createBankAccount(350)   // separate balance
// balance is unreachable directly — only deposit / withdraw can touch it`
</script>

<template>
  <div class="grid gap-6 md:grid-cols-[1fr_1.1fr]">
    <!-- Live -->
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        <div class="flex flex-1 items-stretch overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
          <span class="flex items-center bg-neutral-100 px-3 font-mono text-sm text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
            >$</span
          >
          <input
            v-model.number="amount"
            type="number"
            min="0"
            class="w-full bg-neutral-50 px-3 py-2 font-mono text-sm text-neutral-800 outline-none dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>
        <select
          v-model="selected"
          class="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-sm text-neutral-800 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
        >
          <option v-for="id in ids" :key="id" :value="id">Account {{ id }}</option>
        </select>
      </div>

      <div class="flex gap-2">
        <button
          type="button"
          class="flex-1 rounded-md border border-accent-500 bg-accent-500 py-2 font-sans text-sm font-medium text-white transition-colors hover:brightness-95"
          @click="transact('deposit')"
        >
          Deposit
        </button>
        <button
          type="button"
          class="flex-1 rounded-md border border-neutral-200 bg-neutral-50 py-2 font-sans text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
          @click="transact('withdraw')"
        >
          Withdraw
        </button>
      </div>

      <ul class="space-y-2">
        <li
          v-for="id in ids"
          :key="id"
          class="flex items-center justify-between rounded-md border px-4 py-2.5 transition-colors"
          :class="
            flash === id
              ? 'border-accent-400 bg-accent-50 dark:bg-accent-500/10'
              : 'border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900'
          "
        >
          <span class="font-sans text-sm text-neutral-500 dark:text-neutral-400">Account {{ id }}</span>
          <span class="font-mono text-sm font-medium text-neutral-800 dark:text-neutral-100">${{ balances[id] }}</span>
        </li>
      </ul>
    </div>

    <!-- Code -->
    <CodeSnippet :code="code" />
  </div>
</template>
