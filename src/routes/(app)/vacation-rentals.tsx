import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/vacation-rentals')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/vacation-rentals"!</div>
}
