<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import {A, Navbar, DarkMode} from "flowbite-svelte";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Navbar class="flex justify-center mt-5">
    <h2 class="text-3xl font-bold text-sky-600">Crown Character Creator</h2>
    <div class="flex gap-4">
        <DarkMode />
        <A href="/create" class="dark:text-gray-100 text-lg font-medium hover:no-underline group text-sky-600 transition duration-300">
            <span class="bg-bottom bg-gradient-to-br hover:text-sky-600 dark:hover:text-sky-300 from-sky-300 to-sky-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
                Create
            </span>
        </A>
        <A href="/characters" class="dark:text-gray-100 text-lg font-medium hover:no-underline group text-sky-600 transition duration-300">
            <span class="bg-bottom bg-gradient-to-br hover:text-sky-600 dark:hover:text-sky-300 from-sky-300 to-sky-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out">
                Characters
            </span>
        </A>
    </div>
</Navbar>
{@render children()}
