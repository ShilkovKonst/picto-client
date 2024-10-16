"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const UserProfileDeactivate = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
      setForm({ ...form, email: user?.sub });
    }
  }, []);
  useEffect(() => {
    setForm({ ...form, email: user?.sub });
  }, [user]);

  const handleChange = (e) => {
    // isError && setIsError(false);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: logic to desactivate users profile
    console.warn("TODO: logic to desactivate users profile");
  };

  return (
    <div className="mx-auto w-full lg:w-2/3">
      <div className="flex flex-col items-center justify-between">
        <p className="text-lg text-center font-bold p-2 border-b">
          <span className="font-semibold">Désactivation du profil </span>
        </p>
        <div className="text-sm md:text-base tracking-[0.25px] leading-relaxed mb-10">
          <p className="my-1">
            Après la désactivation de votre profil, vous ne pourrez plus :
          </p>
          <ul className="list-disc ml-5">
            <li>
              <span className="font-bold">gérer les données</span> du profil
            </li>
            <li>
              <span className="font-bold">gérer les données</span> des patients
            </li>
            <li>
              <span className="font-bold">prendre des notes</span> sur
              l&apos;état des patients
            </li>
            <li>
              <span className="font-bold">créer des sessions</span> de jeu pour
              les patients
            </li>
          </ul>
          <p className="my-1">
            Toutes les fonctionnalités seront bloquées, seule la visualisation
            des données initiales de l&apos;utilisateur désactivé sera possible.
          </p>
        </div>
      </div>

      <form className="flex flex-col items-center justify-between w-full h-full" onSubmit={handleSubmit}>
        <div className="z-50">
          <label className="text-sm md:text-base"  htmlFor="password">Saisir votre mot de passe pour confirmer désactivation</label>
          <input
            type="password"
            name="password"
            id="password"
            className="input-text md:mb-4"
            onChange={handleChange}
            value={form.password}
            required
            placeholder="Mot de passe"
          />
        </div>
        <div className="flex items-center justify-between lg:justify-center gap-5 ">
          <Link
            href="/dashboard"
            className="z-10 btn-b flex justify-center items-center"
            type="submit"
          >
            Annuler
          </Link>
          <button
            className="z-10 btn-b flex justify-center items-center"
            type="submit"
          >
            Désactiver
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileDeactivate;
