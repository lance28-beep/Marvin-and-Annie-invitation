"use client";

import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Loader2, Users } from "lucide-react";

interface EntourageMember {
  Name: string;
  RoleCategory: string;
  RoleTitle: string;
  Email: string;
}

const ROLE_CATEGORY_ORDER = [
  "The Couple",
  "Parents of the Groom",
  "Parents of the Bride",
  "Best Man",
  "Maid of Honor",
  "Candle Sponsors",
  "Veil Sponsors",
  "Cord Sponsors",
  "Groomsmen",
  "Bridesmaids",
  "Flower Girls",
  "Ring/Coin Bearers",
];

export function Entourage() {
  const [entourage, setEntourage] = useState<EntourageMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntourage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/entourage", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch entourage");
      }
      const data: EntourageMember[] = await response.json();
      setEntourage(data);
    } catch (error: any) {
      console.error("Failed to load entourage:", error);
      setError(error?.message || "Failed to load entourage");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntourage();

    // Set up auto-refresh listener for dashboard updates
    const handleEntourageUpdate = () => {
      setTimeout(() => {
        fetchEntourage();
      }, 1000);
    };

    window.addEventListener("entourageUpdated", handleEntourageUpdate);

    return () => {
      window.removeEventListener("entourageUpdated", handleEntourageUpdate);
    };
  }, []);

  // Group entourage by role category
  const grouped = useMemo(() => {
    const grouped: Record<string, EntourageMember[]> = {};

    entourage.forEach((member) => {
      const category = member.RoleCategory || "Other";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(member);
    });

    return grouped;
  }, [entourage]);

  // Helper component for elegant section titles
  const SectionTitle = ({
    children,
    align = "center",
    className = "",
  }: {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
  }) => {
    const textAlign =
      align === "right"
        ? "text-right"
        : align === "left"
          ? "text-left"
          : "text-center";
    return (
      <h3
        className={`text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-semibold uppercase text-[#1A1A1A] mb-3 sm:mb-4 md:mb-5 tracking-[0.12em] ${textAlign} ${className}`}
      >
        {children}
      </h3>
    );
  };

  // Helper component for name items with role title (supports alignment)
  const NameItem = ({
    member,
    align = "center",
    showRole = true,
  }: {
    member: EntourageMember;
    align?: "left" | "center" | "right";
    showRole?: boolean;
  }) => {
    const containerAlign =
      align === "right"
        ? "items-end"
        : align === "left"
          ? "items-start"
          : "items-center";
    const textAlign =
      align === "right"
        ? "text-right"
        : align === "left"
          ? "text-left"
          : "text-center";
    return (
      <div
        className={`flex flex-col ${containerAlign} justify-center py-1.5 sm:py-2 md:py-2.5 leading-relaxed`}
      >
        <p
          className={`text-[#1A1A1A] text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-medium ${textAlign}`}
        >
          {member.Name}
        </p>
        {showRole && member.RoleTitle && (
          <p
            className={`text-[#1A1A1A]/60 text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-normal mt-1 leading-snug ${textAlign}`}
          >
            {member.RoleTitle}
          </p>
        )}
      </div>
    );
  };

  // Helper component for two-column layout wrapper
  const TwoColumnLayout = ({
    children,
    leftTitle,
    rightTitle,
    singleTitle,
    centerContent = false,
  }: {
    children: React.ReactNode;
    leftTitle?: string;
    rightTitle?: string;
    singleTitle?: string;
    centerContent?: boolean;
  }) => {
    if (singleTitle) {
      return (
        <div className="mb-5 sm:mb-7 md:mb-9 lg:mb-12">
          <SectionTitle>{singleTitle}</SectionTitle>
          <div
            className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5 sm:gap-y-2 md:gap-y-3 ${centerContent ? "max-w-2xl mx-auto" : ""}`}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <div className="mb-5 sm:mb-7 md:mb-9 lg:mb-12">
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 mb-2.5 sm:mb-3.5 md:mb-5">
          {leftTitle && (
            <SectionTitle align="right" className="pr-3 sm:pr-4 md:pr-6">
              {leftTitle}
            </SectionTitle>
          )}
          {rightTitle && (
            <SectionTitle align="left" className="pl-3 sm:pl-4 md:pl-6">
              {rightTitle}
            </SectionTitle>
          )}
        </div>
        <div
          className={`grid grid-cols-1 min-[350px]:grid-cols-2 gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5 sm:gap-y-2 md:gap-y-3 ${centerContent ? "max-w-2xl mx-auto" : ""}`}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <section
      id="entourage"
      className="relative min-h-screen py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-transparent"
    >

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal text-white mb-6 sm:mb-8 uppercase tracking-[0.12em] sm:tracking-[0.15em]" style={{ textShadow: '0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.5)' }}>
          Wedding Entourage
        </h2>

        <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4" style={{ textShadow: '0 0 15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.5)' }}>
          Our cherished family and friends
        </p>
      </div>

      {/* Central Card Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Main card with elegant styling */}
        <div className="relative group">
          {/* Subtle glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

          <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-[#1A1A1A]/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60 overflow-hidden">
            {/* Card content */}
            <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
              {isLoading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-[#1A1A1A]" />
                    <span className="text-[#1A1A1A]/70 font-[family-name:var(--font-crimson)] text-lg">
                      Loading entourage...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-24">
                  <div className="text-center">
                    <p className="text-red-600 font-[family-name:var(--font-crimson)] text-lg mb-4">
                      {error}
                    </p>
                    <button
                      onClick={fetchEntourage}
                      className="text-[#1A1A1A] hover:text-[#1A1A1A]/70 font-[family-name:var(--font-crimson)] underline transition-colors duration-300"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : entourage.length === 0 ? (
                <div className="text-center py-24">
                  <Users className="h-16 w-16 text-[#1A1A1A]/30 mx-auto mb-4" />
                  <p className="text-[#1A1A1A]/70 font-[family-name:var(--font-crimson)] text-lg">
                    No entourage members yet
                  </p>
                </div>
              ) : (
                <>
                  {ROLE_CATEGORY_ORDER.map((category, categoryIndex) => {
                    const members = grouped[category] || [];

                    if (members.length === 0) return null;

                    // Special handling for The Couple - display Bride and Groom side by side
                    if (category === "The Couple") {
                      const groom = members.find((m) =>
                        m.RoleTitle?.toLowerCase().includes("groom"),
                      );
                      const bride = members.find((m) =>
                        m.RoleTitle?.toLowerCase().includes("bride"),
                      );

                      return (
                        <div key={category}>
                          {categoryIndex > 0 && (
                            <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                              <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                              <div className="w-1.5 h-1.5 bg-[#1A1A1A]/50 rounded-full" />
                              <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                            </div>
                          )}
                          <TwoColumnLayout
                            singleTitle="The Couple"
                            centerContent={true}
                          >
                            <div className="px-3 sm:px-4 md:px-6">
                              {groom && (
                                <NameItem member={groom} align="right" />
                              )}
                            </div>
                            <div className="px-3 sm:px-4 md:px-6">
                              {bride && (
                                <NameItem member={bride} align="left" />
                              )}
                            </div>
                          </TwoColumnLayout>
                        </div>
                      );
                    }

                    // Special handling for Parents sections - combine into single two-column layout
                    if (
                      category === "Parents of the Bride" ||
                      category === "Parents of the Groom"
                    ) {
                      // Get both parent groups
                      const parentsBride =
                        grouped["Parents of the Bride"] || [];
                      const parentsGroom =
                        grouped["Parents of the Groom"] || [];

                      // Helper function to sort parents: father first, then mother
                      const sortParents = (members: EntourageMember[]) => {
                        return [...members].sort((a, b) => {
                          const aIsFather =
                            a.RoleTitle?.toLowerCase().includes("father") ??
                            false;
                          const bIsFather =
                            b.RoleTitle?.toLowerCase().includes("father") ??
                            false;

                          // Father comes first
                          if (aIsFather && !bIsFather) return -1;
                          if (!aIsFather && bIsFather) return 1;
                          return 0;
                        });
                      };

                      // Only render once (when processing "Parents of the Groom")
                      if (category === "Parents of the Groom") {
                        return (
                          <div key="Parents">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/50 rounded-full" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Parents of the Groom"
                              rightTitle="Parents of the Bride"
                            >
                              {(() => {
                                const leftArr = sortParents(parentsGroom);
                                const rightArr = sortParents(parentsBride);
                                const maxLen = Math.max(
                                  leftArr.length,
                                  rightArr.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const left = leftArr[i];
                                  const right = rightArr[i];
                                  rows.push(
                                    <React.Fragment key={`parents-row-${i}`}>
                                      <div
                                        key={`parent-groom-${i}`}
                                        className="px-3 sm:px-4 md:px-6"
                                      >
                                        {left ? (
                                          <NameItem
                                            member={left}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-1 sm:py-1.5 md:py-2" />
                                        )}
                                      </div>
                                      <div
                                        key={`parent-bride-${i}`}
                                        className="px-3 sm:px-4 md:px-6"
                                      >
                                        {right ? (
                                          <NameItem
                                            member={right}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-1 sm:py-1.5 md:py-2" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Parents of the Bride" since it's already rendered above
                      return null;
                    }

                    // Special handling for Maid of Honor and Best Man - combine into single two-column layout
                    if (
                      category === "Maid of Honor" ||
                      category === "Best Man"
                    ) {
                      // Get both honor attendant groups
                      const maidOfHonor = grouped["Maid of Honor"] || [];
                      const bestMan = grouped["Best Man"] || [];

                      // Only render once (when processing "Best Man")
                      if (category === "Best Man") {
                        return (
                          <div key="HonorAttendants">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/50 rounded-full" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Best Man"
                              rightTitle="Maid of Honor"
                            >
                              {(() => {
                                const maxLen = Math.max(
                                  bestMan.length,
                                  maidOfHonor.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const left = bestMan[i];
                                  const right = maidOfHonor[i];
                                  rows.push(
                                    <React.Fragment key={`honor-row-${i}`}>
                                      <div
                                        key={`bestman-cell-${i}`}
                                        className="px-3 sm:px-4 md:px-6"
                                      >
                                        {left ? (
                                          <NameItem
                                            member={left}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-1 sm:py-1.5 md:py-2" />
                                        )}
                                      </div>
                                      <div
                                        key={`maid-cell-${i}`}
                                        className="px-3 sm:px-4 md:px-6"
                                      >
                                        {right ? (
                                          <NameItem
                                            member={right}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-1 sm:py-1.5 md:py-2" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Maid of Honor" since it's already rendered above
                      return null;
                    }

                    // Special handling for Bridesmaids and Groomsmen - combine into single two-column layout
                    if (
                      category === "Bridesmaids" ||
                      category === "Groomsmen"
                    ) {
                      // Get both bridal party groups
                      const bridesmaids = grouped["Bridesmaids"] || [];
                      const groomsmen = grouped["Groomsmen"] || [];

                      // Only render once (when processing "Bridesmaids")
                      if (category === "Bridesmaids") {
                        return (
                          <div key="BridalParty">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/50 rounded-full" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Groomsmen"
                              rightTitle="Bridesmaids"
                            >
                              {(() => {
                                const maxLen = Math.max(
                                  bridesmaids.length,
                                  groomsmen.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const groomsman = groomsmen[i];
                                  const bridesmaid = bridesmaids[i];
                                  rows.push(
                                    <React.Fragment key={`bridal-row-${i}`}>
                                      <div
                                        key={`groomsman-cell-${i}`}
                                        className="px-3 sm:px-4 md:px-6"
                                      >
                                        {groomsman ? (
                                          <NameItem
                                            member={groomsman}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-1 sm:py-1.5 md:py-2" />
                                        )}
                                      </div>
                                      <div
                                        key={`bridesmaid-cell-${i}`}
                                        className="px-3 sm:px-4 md:px-6"
                                      >
                                        {bridesmaid ? (
                                          <NameItem
                                            member={bridesmaid}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-1 sm:py-1.5 md:py-2" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Groomsmen" since it's already rendered above
                      return null;
                    }

                    // Special handling for Candle/Veil Sponsors sections - combine into single two-column layout
                    if (
                      category === "Candle Sponsors" ||
                      category === "Veil Sponsors"
                    ) {
                      // Get both sponsor groups
                      const candleSponsors = grouped["Candle Sponsors"] || [];
                      const veilSponsors = grouped["Veil Sponsors"] || [];

                      // Only render once (when processing "Candle Sponsors")
                      if (category === "Candle Sponsors") {
                        return (
                          <div key="Sponsors">
                            {categoryIndex > 0 && (
                              <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/50 rounded-full" />
                                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                              </div>
                            )}
                            <TwoColumnLayout
                              leftTitle="Candle Sponsors"
                              rightTitle="Veil Sponsors"
                            >
                              {(() => {
                                const maxLen = Math.max(
                                  candleSponsors.length,
                                  veilSponsors.length,
                                );
                                const rows = [];
                                for (let i = 0; i < maxLen; i++) {
                                  const left = candleSponsors[i];
                                  const right = veilSponsors[i];
                                  rows.push(
                                    <React.Fragment key={`sponsors-row-${i}`}>
                                      <div
                                        key={`candle-cell-${i}`}
                                        className="px-3 sm:px-4 md:px-6"
                                      >
                                        {left ? (
                                          <NameItem
                                            member={left}
                                            align="right"
                                          />
                                        ) : (
                                          <div className="py-1 sm:py-1.5 md:py-2" />
                                        )}
                                      </div>
                                      <div
                                        key={`veil-cell-${i}`}
                                        className="px-3 sm:px-4 md:px-6"
                                      >
                                        {right ? (
                                          <NameItem
                                            member={right}
                                            align="left"
                                          />
                                        ) : (
                                          <div className="py-1 sm:py-1.5 md:py-2" />
                                        )}
                                      </div>
                                    </React.Fragment>,
                                  );
                                }
                                return rows;
                              })()}
                            </TwoColumnLayout>
                          </div>
                        );
                      }
                      // Skip rendering for "Veil Sponsors" since it's already rendered above
                      return null;
                    }

                    // Default: single title, centered content
                    return (
                      <div key={category}>
                        {categoryIndex > 0 && (
                          <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                            <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                            <div className="w-1.5 h-1.5 bg-[#1A1A1A]/50 rounded-full" />
                            <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                          </div>
                        )}
                        <TwoColumnLayout
                          singleTitle={category}
                          centerContent={true}
                        >
                          {(() => {
                            const SINGLE_COLUMN_SECTIONS = new Set([
                              "Best Man",
                              "Maid of Honor",
                              "Ring Bearer",
                              "Coin Bearer",
                              "Bible Bearer",
                              "Presider",
                            ]);
                            // Special rule: Cord Sponsors with exactly 2 names should be displayed as two columns meeting at center
                            if (
                              category === "Cord Sponsors" &&
                              members.length === 2
                            ) {
                              const left = members[0];
                              const right = members[1];
                              return (
                                <>
                                  <div className="px-3 sm:px-4 md:px-6">
                                    <NameItem member={left} align="right" />
                                  </div>
                                  <div className="px-3 sm:px-4 md:px-6">
                                    <NameItem member={right} align="left" />
                                  </div>
                                </>
                              );
                            }
                            if (
                              SINGLE_COLUMN_SECTIONS.has(category) ||
                              members.length <= 2
                            ) {
                              return (
                                <div className="col-span-full">
                                  <div className="max-w-sm mx-auto flex flex-col items-center gap-2 sm:gap-2.5">
                                    {members.map((member, idx) => (
                                      <NameItem
                                        key={`${category}-${idx}-${member.Name}`}
                                        member={member}
                                        align="center"
                                      />
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            // Default two-column sections: render row-by-row pairs to keep alignment on small screens
                            const half = Math.ceil(members.length / 2);
                            const left = members.slice(0, half);
                            const right = members.slice(half);
                            const maxLen = Math.max(left.length, right.length);
                            const rows = [];
                            for (let i = 0; i < maxLen; i++) {
                              const l = left[i];
                              const r = right[i];
                              rows.push(
                                <React.Fragment key={`${category}-row-${i}`}>
                                  <div
                                    key={`${category}-cell-left-${i}`}
                                    className="px-3 sm:px-4 md:px-6"
                                  >
                                    {l ? (
                                      <NameItem member={l} align="right" />
                                    ) : (
                                      <div className="py-1 sm:py-1.5 md:py-2" />
                                    )}
                                  </div>
                                  <div
                                    key={`${category}-cell-right-${i}`}
                                    className="px-3 sm:px-4 md:px-6"
                                  >
                                    {r ? (
                                      <NameItem member={r} align="left" />
                                    ) : (
                                      <div className="py-1 sm:py-1.5 md:py-2" />
                                    )}
                                  </div>
                                </React.Fragment>,
                              );
                            }
                            return rows;
                          })()}
                        </TwoColumnLayout>
                      </div>
                    );
                  })}

                  {/* Display any other categories not in the ordered list */}
                  {Object.keys(grouped)
                    .filter((cat) => !ROLE_CATEGORY_ORDER.includes(cat))
                    .map((category) => {
                      const members = grouped[category];
                      return (
                        <div key={category}>
                          <div className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 mb-6 sm:mb-7 md:mb-9">
                            <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                            <div className="w-1.5 h-1.5 bg-[#1A1A1A]/50 rounded-full" />
                            <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/40" />
                          </div>
                          <TwoColumnLayout
                            singleTitle={category}
                            centerContent={true}
                          >
                            {(() => {
                              if (members.length <= 2) {
                                return (
                                  <div className="col-span-full">
                                    <div className="max-w-sm mx-auto flex flex-col items-center gap-2 sm:gap-2.5">
                                      {members.map((member, idx) => (
                                        <NameItem
                                          key={`${category}-${idx}-${member.Name}`}
                                          member={member}
                                          align="center"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                );
                              }
                              // Pair row-by-row for other categories as well
                              const half = Math.ceil(members.length / 2);
                              const left = members.slice(0, half);
                              const right = members.slice(half);
                              const maxLen = Math.max(
                                left.length,
                                right.length,
                              );
                              const rows = [];
                              for (let i = 0; i < maxLen; i++) {
                                const l = left[i];
                                const r = right[i];
                                rows.push(
                                  <React.Fragment key={`${category}-row-${i}`}>
                                    <div
                                      key={`${category}-cell-left-${i}`}
                                      className="px-3 sm:px-4 md:px-6"
                                    >
                                      {l ? (
                                        <NameItem member={l} align="right" />
                                      ) : (
                                        <div className="py-1 sm:py-1.5 md:py-2" />
                                      )}
                                    </div>
                                    <div
                                      key={`${category}-cell-right-${i}`}
                                      className="px-3 sm:px-4 md:px-6"
                                    >
                                      {r ? (
                                        <NameItem member={r} align="left" />
                                      ) : (
                                        <div className="py-1 sm:py-1.5 md:py-2" />
                                      )}
                                    </div>
                                  </React.Fragment>,
                                );
                              }
                              return rows;
                            })()}
                          </TwoColumnLayout>
                        </div>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
