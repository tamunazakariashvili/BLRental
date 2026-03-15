import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { IconUser, IconMail, IconLoader2 } from "@tabler/icons-react";

const UpdateMyProfileForm = () => {
  const { t } = useTranslation();
  const { user, updateMyProfile } = useAuth();
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateMyProfile({ fullname, email });
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
          {t('Update')} <span className="text-[rgb(34,40,52)]">{t('Profile')}</span>
        </h3>
        <p className="text-xs md:text-sm text-gray-400 mt-1 font-medium">
          {t('Manage your personal account details')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name Field */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase text-gray-500 tracking-wider ml-1">
            {t('Full Name')}
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
              <IconUser size={18} />
            </div>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-6 text-sm font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-orange-500/50 focus:bg-white transition-all shadow-sm"
              placeholder={t('Enter your full name')}
              required
            />
          </div>
        </div>

        {/* Email Address Field */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase text-gray-500 tracking-wider ml-1">
            {t('Email Address')}
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
              <IconMail size={18} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-6 text-sm font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-orange-500/50 focus:bg-white transition-all shadow-sm"
              placeholder="e.g. user@example.com"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-[#1A1C21]  disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm py-4 rounded-xl transition-all active:scale-[0.98] shadow-md flex justify-center items-center"
        >
          {loading ? (
            <span className="flex items-center gap-3">
              <IconLoader2 className="animate-spin" size={18} />
              {t('Updating profile...')}
            </span>
          ) : (
            t('Save Changes')
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateMyProfileForm;