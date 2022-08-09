import React from "react"

export const Wagerinput = () => {

  return (

    <div class="relative">
      <label class="sr-only" for="email"> Wager </label>

      <input
        class="w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg"
        id="wager"
        type="number"
        placeholder="Wager"
      />

      <button class="absolute p-2 text-black -translate-y-1/2 bg-[#D8E9BC] rounded-lg top-1/2 right-4" type="button">
        Submit
      </button>
    </div>



  )
}