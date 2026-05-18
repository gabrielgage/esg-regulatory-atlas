export function CopyOutputNote({ className = "" }: { className?: string }) {
  const classes = ["print:hidden text-xs leading-5 text-slate-500", className].filter(Boolean).join(" ");

  return (
    <p className={classes}>
      Copied Markdown includes caveats and source-review notes. Validate primary sources and entity-specific facts before sharing or relying on it.
    </p>
  );
}
