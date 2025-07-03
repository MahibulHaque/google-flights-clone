import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/hotels')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/hotels"!</div>
}
