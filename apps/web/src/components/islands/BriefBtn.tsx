// tiny island: prefill in-page ContactForm via 'bw-brief' event
export default function BriefBtn({ service, label, class: cls, style }: { service: string; label: string; class?: string; style?: string }) {
  return <button type="button" class={cls} style={style} onClick={() => window.dispatchEvent(new CustomEvent('bw-brief', { detail: { service } }))}>{label}</button>;
}
