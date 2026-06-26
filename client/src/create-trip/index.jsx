import { AIPrompt, budgetOptions, travelOptions } from "@/assets/assets";
import { useState } from "react";
import TomTomAutocomplete from "@/components/custom/TomTomAutocomplete";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { FcGoogle } from "react-icons/fc";
import { TripCreateThunk } from "@/store/slices/TripSlice";
import { UserRegister } from "@/store/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Wallet, CreditCard, Gem,
  User, Heart, Home, Users,
  MapPin, Loader2, ArrowRight,
  CheckCircle2
} from "lucide-react";

/* ── Icon maps ── */
const BUDGET_ICONS = {
  Cheap: Wallet,
  Moderate: CreditCard,
  Luxury: Gem,
};

const PEOPLE_ICONS = {
  "1 person": User,
  "2 people": Heart,
  "3 to 5 people": Home,
  "more than 5 people": Users,
};

/* ── Step indicator ── */
const STEPS = ["Destination", "Duration", "Budget", "Travelers"];

function StepBar({ current }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center shrink-0">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                i < current
                  ? "bg-primary border-primary text-primary-foreground"
                  : i === current
                  ? "border-primary text-primary bg-transparent"
                  : "border-border text-muted-foreground bg-transparent"
              }`}
            >
              {i < current ? (
                <CheckCircle2 size={14} strokeWidth={2.5} />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`mt-1 text-[10px] font-medium hidden sm:block whitespace-nowrap ${
                i <= current ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-px mx-1 transition-all duration-500 ${
                i < current ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Pill option selector ── */
function PillOption({ icon: Icon, label, sublabel, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-left w-full group ${
        selected
          ? "border-primary bg-primary/8 text-primary"
          : "border-border text-foreground hover:border-primary/40 hover:bg-muted/50"
      }`}
    >
      <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
        selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
      }`}>
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-none ${selected ? "text-primary" : "text-foreground"}`}>
          {label}
        </p>
        {sublabel && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{sublabel}</p>
        )}
      </div>
      <div className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
        selected ? "border-primary bg-primary" : "border-border"
      }`}>
        {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
    </button>
  );
}

/* ── Section wrapper ── */
function FormSection({ step, current, title, hint, children }) {
  const active = current >= step - 1;
  return (
    <div className={`py-7 border-b border-border last:border-0 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-40 pointer-events-none select-none"}`}>
      <div className="flex items-start gap-3 mb-5">
        <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
          current >= step - 1
            ? "border-primary text-primary"
            : "border-border text-muted-foreground"
        }`}>
          {step}
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ── Main component ── */
function CreateTrip() {
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trip = useSelector((state) => state.trip.trip);

  if (Object.keys(trip).length > 0) {
    navigate(`/trip/${trip?._id}`);
  }

  const handle = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

  const currentStep = (() => {
    if (!formData.place) return 0;
    if (!formData.days) return 1;
    if (!formData.budget) return 2;
    if (!formData.people) return 3;
    return 4;
  })();

  const allFilled = formData.place && formData.days && formData.budget && formData.people;

  const GenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) { setOpenDialog(true); return; }
    if (!allFilled) return toast.error("Please fill all fields");
    if (formData.days <= 0 || formData.days > 7) return toast.error("Trip duration must be 1–7 days");

    const aiPrompt = AIPrompt
      .replace("{location}", formData.place?.label)
      .replace("{days}", formData.days)
      .replace("{people}", formData.people)
      .replace("{budget}", formData.budget);
    try {
      setLoading(true);
      await dispatch(TripCreateThunk({
        prompt: aiPrompt,
        email: user.email,
        choice: { ...formData, place: formData.place.label }
      }));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (res) => {
      dispatch(UserRegister(res)).then(() => {
        setOpenDialog(false);
        GenerateTrip();
      });
    },
    onError: (e) => console.log(e)
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── Back button ── */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Back
        </button>

        {/* ── Header ── */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
            <MapPin size={11} strokeWidth={2.5} />
            AI Trip Planner
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Plan your perfect trip
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
            Answer a few questions and our AI will craft a personalized itinerary — hotels, activities, and a full day-by-day plan.
          </p>
        </div>

        {/* ── Progress ── */}
        <StepBar current={currentStep} />

        {/* ── Form ── */}
        <div className={`transition-all duration-300 ${loading ? "pointer-events-none opacity-50 select-none" : ""}`}>

          {/* Step 1 – Destination */}
          <FormSection step={1} current={currentStep} title="Where do you want to go?" hint="Search for any city, country, or region">
            <TomTomAutocomplete
              placeholder="Search destination..."
              onChange={(v) => handle("place", v)}
            />
            {formData.place && (
              <p className="mt-2 text-xs text-primary font-medium flex items-center gap-1">
                <MapPin size={11} strokeWidth={2.5} />
                {formData.place.label}
              </p>
            )}
          </FormSection>

          {/* Step 2 – Duration */}
          <FormSection step={2} current={currentStep} title="How many days?" hint="Trips from 1 to 7 days">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handle("days", d)}
                  className={`w-11 h-11 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                    formData.days === d
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </FormSection>

          {/* Step 3 – Budget */}
          <FormSection step={3} current={currentStep} title="What's your budget?" hint="We'll tailor hotels and activities to match">
            <div className="flex flex-col gap-2">
              {budgetOptions.map((b) => {
                const Icon = BUDGET_ICONS[b.title] ?? Wallet;
                return (
                  <PillOption
                    key={b.id}
                    icon={Icon}
                    label={b.title}
                    sublabel={b.description}
                    selected={formData.budget === b.title}
                    onClick={() => handle("budget", b.title)}
                  />
                );
              })}
            </div>
          </FormSection>

          {/* Step 4 – Travel group */}
          <FormSection step={4} current={currentStep} title="Who's traveling?" hint="We'll adapt the plan to your group size and style">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {travelOptions.map((t) => {
                const Icon = PEOPLE_ICONS[t.people] ?? Users;
                return (
                  <PillOption
                    key={t.id}
                    icon={Icon}
                    label={t.title}
                    sublabel={t.description}
                    selected={formData.people === t.people}
                    onClick={() => handle("people", t.people)}
                  />
                );
              })}
            </div>
          </FormSection>

        </div>

        {/* ── Summary + Generate ── */}
        <div className={`mt-8 flex flex-col items-end transition-all duration-500 ${allFilled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
          <div className="flex flex-wrap gap-2 mb-4 justify-end">
            {formData.place && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-foreground border border-border">
                <MapPin size={10} strokeWidth={2.5} className="text-primary" />
                {formData.place?.label}
              </span>
            )}
            {formData.days && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-foreground border border-border">
                {formData.days} day{formData.days > 1 ? "s" : ""}
              </span>
            )}
            {formData.budget && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-foreground border border-border">
                {formData.budget} budget
              </span>
            )}
            {formData.people && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-foreground border border-border">
                {formData.people}
              </span>
            )}
          </div>
          <Button
            onClick={GenerateTrip}
            disabled={loading}
            className="rounded-full px-7 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Generating your trip…
              </>
            ) : (
              <>
                Generate my itinerary
                <ArrowRight size={16} strokeWidth={2.5} />
              </>
            )}
          </Button>
        </div>

        {/* ── Sign-In Dialog ── */}
        <Modal
          open={openDialog}
          onOpenChange={setOpenDialog}
          title="Sign in to continue"
          description="Create a free account to save and manage your AI-generated trips."
          icon={
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
              <FcGoogle size={36} />
            </div>
          }
        >
          <div className="w-full flex flex-col items-center gap-5 mt-4">
            <Button onClick={() => login()} className="w-full rounded-full shadow-md">
              <FcGoogle size={18} />
              Continue with Google
            </Button>
            <p className="text-xs text-muted-foreground">
              By continuing you agree to our Terms & Privacy Policy.
            </p>
          </div>
        </Modal>

      </div>
    </div>
  );
}

export default CreateTrip;
