import { createContext, useContext, useState, useMemo } from "react";
import { apiCreateBooking, apiUpdateBooking, deleteBooking, getAllBookings, getMyBookings } from "../services/bookngService";
import { createCheckout } from "../services/paymentService";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [booking, setBooking] = useState(null);
    const [myBookings, setMyBookings] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchMyBookings();
            if (user.role === 'admin') {
                fetchAllBookings();
            }
        } else {
            setMyBookings([]);
            setAllBookings([]);
        }
    }, [user]);

    const createBooking = async (formData) => {
        const toastId = toast.loading('Sending your booking request...');
        try {
         
            const response = await apiCreateBooking(formData);
            const newBooking = response.data.booking;

            setBooking(newBooking);

           
            await fetchMyBookings();
            if (user?.role === 'admin') {
                await fetchAllBookings();
            }

            toast.update(toastId, {
                render: 'Request sent! We will contact you soon.',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });

            return newBooking;
        } catch (err) {
            const message = err?.response?.data?.message || "Booking failed";
            toast.update(toastId, {
                render: message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            setError(message);
            throw err;
        }
    };

    const fetchMyBookings = async () => {
        try {
            const response = await getMyBookings();
            setMyBookings(response.data.bookings);
        } catch (err) {
            console.error("Failed to load my bookings:", err.message);
        }
    };

    const fetchAllBookings = async () => {
        try {
            const response = await getAllBookings();
            setAllBookings(response.data.bookings);
        } catch (err) {
            console.error("Failed to load all bookings:", err.message);
        }
    };

    const deletedBooking = async (id) => {
        const toastId = toast.loading('Deleting...');
        try {
            await deleteBooking(id);
            setAllBookings(prev => prev.filter(b => b._id !== id));
            setMyBookings(prev => prev.filter(b => b._id !== id));

            toast.update(toastId, {
                render: 'Deleted successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });
        } catch (err) {
            toast.update(toastId, {
                render: "Delete failed",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };

    const updateBooking = async (id, data) => {
        const toastId = toast.loading('Updating...');
        try {
            const response = await apiUpdateBooking(id, data);
            const updatedDoc = response.data.booking;

            const updateList = (prev) => prev.map(b =>
                b._id === id ? { ...b, ...updatedDoc } : b
            );

            setAllBookings(updateList);
            setMyBookings(updateList);

            toast.update(toastId, {
                render: 'Status updated',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });

            return updatedDoc;
        } catch (err) {
            toast.dismiss(toastId);
            throw err;
        }
    };

    const totalRevenue = useMemo(() => {
        return allBookings
            ?.filter(b => b.status?.toLowerCase() === 'confirmed' || b.status?.toLowerCase() === 'completed')
            .reduce((sum, b) => sum + (b.totalPrice || 0), 0) || 0;
    }, [allBookings]);

    return (
        <BookingContext.Provider value={{
            booking,
            myBookings,
            allBookings,
            error,
            createBooking,
            fetchMyBookings,
            fetchAllBookings,
            deletedBooking,
            updateBooking,
            totalRevenue
        }}>
            {children}
        </BookingContext.Provider>
    );
};