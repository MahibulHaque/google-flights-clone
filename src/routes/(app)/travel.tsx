import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/travel')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/travel"!</div>
}
