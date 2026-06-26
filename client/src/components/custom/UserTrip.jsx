/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { DeleteTripThunk } from "@/store/slices/TripSlice";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const UserTrip = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = trip?.trip?.location ?? trip?.choice?.place ?? "Unknown destination";
  const days = trip?.choice?.days ?? "?";
  const budget = trip?.choice?.budget ?? "";

  const goToTrip = () => navigate(`/trip/${trip?._id}`);

  const handleDelete = async () => {
    setDeleteOpen(false);
    await dispatch(DeleteTripThunk(trip._id));
  };

  const openDelete = (e) => {
    e.stopPropagation();
    setDeleteOpen(true);
  };

  const getPlacePhoto = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        params: { query: `${trip?.trip?.location || trip?.choice?.place} travel landscape`, per_page: 5 },
        headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
      });
      const images = response.data.photos.map((p) => p.src.landscape);
      setPhotoUrl(images[0] ?? "");
    } catch (err) {
      toast.error(err.message || "Could not load image");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trip) getPlacePhoto();
  }, [trip]);

  return (
    <>
      <div
        onClick={goToTrip}
        className="group relative rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        {/* Image area */}
        <div className="relative h-44 w-full overflow-hidden bg-muted">
          {loading ? (
            <Skeleton className="size-full rounded-none" />
          ) : (
            <img
              src={photoUrl}
              alt={location}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Delete button */}
          <button
            onClick={openDelete}
            aria-label="Delete trip"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all duration-200 backdrop-blur-sm"
          >
            <Trash2 size={14} strokeWidth={2} />
          </button>
        </div>

        {/* Card body */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground text-base leading-snug line-clamp-1">
            {location}
          </h3>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {days && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                🗓 {days} days
              </span>
            )}
            {budget && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                💰 {budget}
              </span>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-b-2xl" />
      </div>

      {/* ── Delete confirmation modal ── */}
      <Modal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete this trip?"
        description={`Are you sure you want to delete your trip to ${location}? This action cannot be undone.`}
        icon={
          <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
            <Trash2 size={24} className="text-red-500" />
          </div>
        }
      >
        <div className="w-full flex flex-col gap-3 mt-6">
          <Button
            onClick={handleDelete}
            className="w-full rounded-full py-6 bg-red-500 hover:bg-red-600 text-white"
          >
            Yes, delete it
          </Button>
          <Button
            variant="outline"
            onClick={() => setDeleteOpen(false)}
            className="w-full rounded-full py-6"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserTrip;
