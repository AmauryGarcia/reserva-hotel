import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

const fetchHotels = async () => {
    const res = await fetch("http://localhost:3001/hotels")
    if (!res.ok) {
        throw new Error("Network response was not OK")
    }
    return res.json()
}

const HotelList = () => {
    const {
        data: hotels,
        isLoading,
        error
    } = useQuery({ querykey: ["hotels"], queryFn: fetchHotels })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error fetching Hotels! {error.message}</div>
    }

    return (
        <>
            <Typography variant="h2" component="h2" align="center" style={{ margin: 16, color: "#000" }}>
                Reserva un hotel
            </Typography>
            <Stack alignItems={"center"} spacing={4}>
                {hotels.map((hotel) => (
                    <Link key={hotel.id} href={`/hotel/${hotel.id}`}>
                        <Card sx={{ maxWidth: 300, backgroundColor: "#e8e8e8" }}>
                            <CardMedia 
                                sx={{ height: 140 }}
                                image={hotel.img}
                                title={hotel.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {hotel.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {hotel.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Ver detalles</Button>
                            </CardActions>
                        </Card>      
                    </Link>
                ))}
            </Stack>
        </>
    )
}

export default HotelList;