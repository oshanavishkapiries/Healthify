import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnimatedContainer, {
  AnimatedItem,
} from "@/components/common/animated-container";

const Booking = () => {
  return (
    <AnimatedContainer className="container mx-auto px-4 py-8">
      <AnimatedItem>
        <h1 className="text-3xl font-bold text-center mb-8">
          Book Your Appointment
        </h1>
      </AnimatedItem>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatedItem>
          <Card>
            <CardHeader>
              <CardTitle>General Consultation</CardTitle>
              <CardDescription>
                Basic health checkup and consultation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary mb-4">$50</p>
              <Button className="w-full">Book Now</Button>
            </CardContent>
          </Card>
        </AnimatedItem>

        <AnimatedItem>
          <Card>
            <CardHeader>
              <CardTitle>Specialist Consultation</CardTitle>
              <CardDescription>
                Expert consultation with specialists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary mb-4">$100</p>
              <Button className="w-full">Book Now</Button>
            </CardContent>
          </Card>
        </AnimatedItem>

        <AnimatedItem>
          <Card>
            <CardHeader>
              <CardTitle>Emergency Care</CardTitle>
              <CardDescription>Urgent medical attention</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary mb-4">$150</p>
              <Button className="w-full">Book Now</Button>
            </CardContent>
          </Card>
        </AnimatedItem>
      </div>
    </AnimatedContainer>
  );
};

export default Booking;
