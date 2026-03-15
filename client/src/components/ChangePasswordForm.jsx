import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { IconShieldCheck, IconEye, IconEyeOff, IconLoader2 } from "@tabler/icons-react";

const InputGroup = ({ label, value, onChange, show, setShow, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-semibold uppercase text-gray-500 tracking-wider ml-1">
      {label}
    </label>
    <div className="relative group">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-5 pr-12 text-sm font-medium text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-orange-500/50 focus:bg-white transition-all shadow-sm"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
      >
        {show ? <IconEyeOff size={18} /> : <IconEye size={18} />}
      </button>
    </div>
  </div>
);

const ChangePassword = () => {
  const { t } = useTranslation();
  const { changeUserPassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert(t("Passwords do not match"));
      return;
    }

    setLoading(true);
    try {
      await changeUserPassword({ currentPassword, newPassword });
      alert(t("Password changed successfully!"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(error.message || t("Failed to change password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
            <IconShieldCheck size={24} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            {t('Security')} <span className="text-[rgb(34,40,52)]">{t('Settings')}</span>
          </h3>
        </div>
        <p className="text-xs md:text-sm text-gray-400 font-medium ml-13">
          {t('Update your password and manage account access')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputGroup 
          label={t("Current Password")} 
          value={currentPassword} 
          onChange={setCurrentPassword} 
          show={showCurrent} 
          setShow={setShowCurrent} 
          placeholder={t("Enter current password")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputGroup 
            label={t("New Password")} 
            value={newPassword} 
            onChange={setNewPassword} 
            show={showNew} 
            setShow={setShowNew} 
            placeholder={t("New password")}
          />
          <InputGroup 
            label={t("Confirm New")} 
            value={confirmPassword} 
            onChange={setConfirmPassword} 
            show={showConfirm} 
            setShow={setShowConfirm} 
            placeholder={t("Confirm password")}
          />
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
              {t('Updating security...')}
            </span>
          ) : (
            t("Save New Credentials")
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ChangePassword;