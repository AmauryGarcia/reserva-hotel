import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import BookingForm from "./BookingForm";
const fetchHotel = async (id) => {
  const res = await fetch(`http://localhost:3001/hotels/${id}`);
  if (!res.ok) {
    throw new Error("Network response was not OK");
  }
  return res.json();
};

const HotelDetails = () => {
  const [match, params] = useRoute("/hotel/:id");
  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotel", params.id],
    queryFn: () => fetchHotel(params.id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching Hotel! {error.message}</div>;
  }

  return (
    <div style={{ display: "grid", placeContent: "center"}}>
      <Card sx={{ maxWidth: 600, backgroundColor: "#e8e8e8", alignItems: "center"}}>
        <CardMedia sx={{ height: 140 }} image={hotel.img} title={hotel.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {hotel.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hotel.description}
          </Typography>
        </CardContent>
        <CardActions>
          <BookingForm hotel={hotel} />
        </CardActions>
      </Card>
    </div>
  );
}

export default HotelDetails;
