import BackgroundImage from '@assets/svg/background.svg';
import {createFileRoute} from '@tanstack/react-router';
export const Route = createFileRoute('/(app)/flights')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container-wrapper">
      <img src={BackgroundImage} className="w-full h-auto" alt="background" />
    </div>
  );
}
