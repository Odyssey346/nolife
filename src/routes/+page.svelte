<script lang="ts">
    import type { PageData, ActionData } from "./$types";
    export let form: ActionData;
</script>

<svelte:head>
    <title>nolife</title>
</svelte:head>

<div class="flex flex-col items-center justify-center mt-5">
<h1 class="text-2xl md:text-5xl lg:text-5xl font-bold text-center"><span class="text-red-600">nolife</span>.odyssey346.dev</h1>
<h2 class="text-2xl font-bold text-center">check if a <span class="text-orange-500">Team Fortress 2</span> player has a life or not</h2>
</div>

<form class="flex flex-col items-center justify-center mt-5" action="?/check" method="POST" >
<input type="text" name="name" class="h-10 px-3 text-xl text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" placeholder="Enter a SteamID64 or the end of a Steam Vanity URL"/>
</form>

{#if form?.success}
<div class="flex flex-col items-center justify-center mt-5">
{#if form?.message === "has a life"}
<h3 class="text-2xl font-bold text-center">player <span class="text-blue-400">{form?.playerUsername}</span> has <span class="text-green-400">a life</span></h3>
{:else if form?.message === "might have a life"}
<h3 class="text-2xl font-bold text-center">player <span class="text-blue-400">{form?.playerUsername}</span> <span class="text-yellow-400">might have a life</span></h3>
{:else if form?.message === "desperately needs to touch grass"}
<h3 class="text-2xl font-bold text-center">player <span class="text-blue-400">{form?.playerUsername}</span> <span class="text-red-400">desperately needs to touch grass</span></h3>
{:else if form?.message === "has a private account."}
<h3 class="text-2xl font-bold text-center">player <span class="text-blue-400">{form?.playerUsername}</span> <span class="text-red-400">has a private account.</span></h3>
{/if}
<p>{form?.playerTF2RecentPlaytimeHours} hours played recently</p>
</div>
{/if}

{#if form?.error}
<div class="flex flex-col items-center justify-center mt-5">
<h3 class="text-2xl font-bold text-center">Something went wrong. {form?.message}</h3>
</div>
{/if}

{#if !form?.error || !form?.success}
<div class="flex flex-col items-center justify-center mt-5">
<h3 class="text-2xl font-bold text-center">enter a SteamID64 or the end of a Steam Vanity URL to check if that player has a life or not!</h3>
<p>for example, try quantum115</p>
</div>
{/if}