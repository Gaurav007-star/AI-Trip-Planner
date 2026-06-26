/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import UserTrip from "@/components/custom/UserTrip";
import { FetchTripThunk } from "@/store/slices/TripSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function TripCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

const Userpage = () => {
  const user = useSelector((state) => state.user.user);
  const trip = useSelector((state) => state.trip.allTrip);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(FetchTripThunk(user.email));
    }
  }, [user]);

  const loading = !Array.isArray(trip);
  const tripCount = Array.isArray(trip) ? trip.length : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Back
        </button>
        <div className="flex flex-col lg:flex-row gap-8">

        {/* ── LEFT: Profile sidebar ── */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4">

          {/* Avatar card */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="relative h-28 bg-gradient-to-br from-primary via-secondary to-accent opacity-80">
              <img
                src={user?.picture ?? "https://placehold.co/100"}
                alt={user?.name}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-card shadow-md object-cover"
              />
            </div>
            <div className="pt-14 pb-5 px-5 flex flex-col items-center">
              <h2 className="text-lg font-semibold text-foreground text-center">
                {user?.name ?? "Traveler"}
              </h2>
              <p className="text-sm text-muted-foreground text-center truncate w-full">
                {user?.email ?? ""}
              </p>
            </div>
          </div>

          {/* Stats card */}
          <div className="rounded-2xl border border-border bg-card shadow-sm p-5 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Overview
            </p>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Trips planned</span>
              <span className="text-sm font-bold text-primary">{tripCount}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Member since</span>
              <span className="text-sm font-semibold text-foreground">
                {user?.memberSince ? new Date(user.memberSince).getFullYear() : new Date().getFullYear()}
              </span>
            </div>
          </div>

          {/* CTA */}
          <Button asChild className="w-full rounded-2xl shadow-sm">
            <Link to="/create-trip">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
              </svg>
              Plan a new trip
            </Link>
          </Button>
        </aside>

        {/* ── RIGHT: Trips grid ── */}
        <main className="flex-1 min-w-0">

          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">My Trips</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {loading
                  ? "Loading your trips..."
                  : tripCount > 0
                    ? `${tripCount} trip${tripCount > 1 ? "s" : ""} planned so far`
                    : "Your adventures will appear here"}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
              ✈️ AI-powered
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              <TripCardSkeleton />
              <TripCardSkeleton />
              <TripCardSkeleton />
            </div>
          ) : tripCount > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {trip.map((t, i) => (
                <UserTrip trip={t} key={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-24 px-8 text-center">
              <div className="text-6xl mb-4 select-none">🗺️</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No trips yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Let our AI craft your perfect itinerary — flights, hotels, and day-by-day plans in seconds.
              </p>
              <Button asChild className="rounded-full mt-6">
                <Link to="/create-trip">
                  Create your first trip →
                </Link>
              </Button>
            </div>
          )}
        </main>

      </div>
      </div>
    </div>
  );
};

export default Userpage;
