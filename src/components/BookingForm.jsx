import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useStore from "../store.js"
import { Button, Input, Typography } from "@mui/material";

function BookingForm ({ hotel }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const addReservation = useStore((state) => state.addReservation)

    const onSubmit = (data) => {
        addReservation(hotel, data)
        toast.success("Reserva realizada")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input type="date" {...register("startDate", { required: true })} />
            {errors.startDate && (
                <Typography style={{ color: "red"}}>La fecha de entrada es requerida</Typography>
            )}
            <br />
            <Input type="date" {...register("endDate", { required: true })} />
            {errors.startDate && (
                <Typography style={{ color: "red"}}>La fecha de fin es requerida</Typography>
            )}
            <br />
            <br />
            <Button variant="contained" type="submit">
                Hacer reservación
            </Button>
        </form>
    )
}

export default BookingForm;