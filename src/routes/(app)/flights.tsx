import BackgroundImage from '@/assets/svg/background.svg';
import {FlightList} from '@/features/flights/components/FlightList';
import {FlightSearchCard} from '@/features/flights/components/FlightSearchCard';
import {createFileRoute} from '@tanstack/react-router';
export const Route = createFileRoute('/(app)/flights')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container-wrapper relative flex flex-col items-center gap-4 pt-12 lg:pt-30">
      <img
        src={BackgroundImage}
        className="w-full h-auto absolute top-0 z-[-1] left-[50%] translate-x-[-50%]"
        alt="background"
      />
      <h1 className="text-4xl lg:text-6xl font-medium text-foreground">
        Flights
      </h1>
      <FlightSearchCard />
      <FlightList />
    </div>
  );
}
