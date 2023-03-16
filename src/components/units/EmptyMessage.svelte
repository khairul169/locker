<script>
  import clsx from "clsx";
</script>

<div class={clsx("empty-message", $$props.class)}>
  <p>
    <slot>Empty.</slot>
  </p>
</div>

<style lang="postcss">
  .empty-message {
    @apply w-full h-40 flex items-center justify-center p-4 rounded-lg
    border-slate-100 gdark:border-primary-900 border;
  }
</style>
