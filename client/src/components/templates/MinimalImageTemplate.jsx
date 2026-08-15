import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Github,
  ExternalLink,
} from "lucide-react";

import { useEffect, useState } from "react";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const [imageUrl, setImageUrl] = useState("");

  const personalInfo = data?.personal_info || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const [year, month] = dateStr.split("-");

    if (!year || !month) return dateStr;

    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
      },
    );
  };

  /* ================= IMAGE HANDLING ================= */

  useEffect(() => {
    if (!personalInfo.image) {
      setImageUrl("");
      return;
    }

    if (typeof personalInfo.image === "string") {
      setImageUrl(personalInfo.image);
      return;
    }

    if (personalInfo.image instanceof File) {
      const url = URL.createObjectURL(personalInfo.image);

      setImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    setImageUrl("");
  }, [personalInfo.image]);

  /* ================= URL HELPERS ================= */

  const cleanUrl = (url) => {
    if (!url) return "";

    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  };

  const normalizeUrl = (url) => {
    if (!url) return "";

    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  return (
    <div
      id="minimal-image-resume"
      className="w-full bg-white text-zinc-800"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[30%_70%]">
        {/* =====================================================
                    LEFT SIDEBAR
                ====================================================== */}

        <aside
          className="p-7 sm:p-8"
          style={{
            backgroundColor: `${accentColor}0A`,
            borderRight: `1px solid ${accentColor}25`,
          }}
        >
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            {imageUrl ? (
              <div
                className="p-1 rounded-full"
                style={{
                  backgroundColor: accentColor,
                }}
              >
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover bg-white"
                />
              </div>
            ) : (
              <div
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                style={{
                  backgroundColor: accentColor,
                }}
              >
                {personalInfo.full_name
                  ? personalInfo.full_name.charAt(0).toUpperCase()
                  : "Y"}
              </div>
            )}
          </div>

          {/* Name */}
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-zinc-900 leading-tight">
              {personalInfo.full_name || "Your Name"}
            </h1>

            {personalInfo.profession && (
              <p
                className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em]"
                style={{
                  color: accentColor,
                }}
              >
                {personalInfo.profession}
              </p>
            )}
          </div>

          {/* Contact */}
          <SidebarHeading title="CONTACT" accentColor={accentColor} />

          <div className="space-y-3 text-xs sm:text-sm text-zinc-600">
            {personalInfo.email && (
              <ContactItem
                icon={Mail}
                value={personalInfo.email}
                accentColor={accentColor}
              />
            )}

            {personalInfo.phone && (
              <ContactItem
                icon={Phone}
                value={personalInfo.phone}
                accentColor={accentColor}
              />
            )}

            {personalInfo.location && (
              <ContactItem
                icon={MapPin}
                value={personalInfo.location}
                accentColor={accentColor}
              />
            )}

            {personalInfo.linkedin && (
              <a
                href={normalizeUrl(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:opacity-75 transition-opacity"
              >
                <Linkedin
                  className="size-4 shrink-0 mt-0.5"
                  style={{
                    color: accentColor,
                  }}
                />

                <span className="break-all">
                  {cleanUrl(personalInfo.linkedin)}
                </span>
              </a>
            )}

            {personalInfo.website && (
              <a
                href={normalizeUrl(personalInfo.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:opacity-75 transition-opacity"
              >
                <Globe
                  className="size-4 shrink-0 mt-0.5"
                  style={{
                    color: accentColor,
                  }}
                />

                <span className="break-all">
                  {cleanUrl(personalInfo.website)}
                </span>
              </a>
            )}
          </div>

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mt-8">
              <SidebarHeading title="EDUCATION" accentColor={accentColor} />

              <div className="space-y-5">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    {edu.degree && (
                      <h3 className="text-sm font-bold text-zinc-900">
                        {edu.degree}
                      </h3>
                    )}

                    {edu.field && (
                      <p className="text-xs text-zinc-600 mt-0.5">
                        {edu.field}
                      </p>
                    )}

                    {edu.institution && (
                      <p
                        className="text-xs font-medium mt-1"
                        style={{
                          color: accentColor,
                        }}
                      >
                        {edu.institution}
                      </p>
                    )}

                    {edu.graduation_date && (
                      <p className="text-xs text-zinc-500 mt-1">
                        {formatDate(edu.graduation_date)}
                      </p>
                    )}

                    {edu.gpa && (
                      <p className="text-xs text-zinc-500 mt-1">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section className="mt-8">
              <SidebarHeading title="SKILLS" accentColor={accentColor} />

              <div className="space-y-2">
                {data.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{
                        backgroundColor: accentColor,
                      }}
                    />

                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* =====================================================
                    RIGHT CONTENT
                ====================================================== */}

        <main className="p-7 sm:p-9">
          {/* Summary */}
          {data.professional_summary?.trim() && (
            <section className="mb-8">
              <SectionHeading
                title="PROFESSIONAL SUMMARY"
                accentColor={accentColor}
              />

              <p className="text-sm leading-6 text-zinc-700">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-8">
              <SectionHeading title="EXPERIENCE" accentColor={accentColor} />

              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative pl-5">
                    {/* Timeline */}
                    <div
                      className="absolute left-0 top-1.5 bottom-0 w-px"
                      style={{
                        backgroundColor: `${accentColor}35`,
                      }}
                    />

                    <div
                      className="absolute left-[-3px] top-1.5 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: accentColor,
                      }}
                    />

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div>
                        {exp.position && (
                          <h3 className="text-base font-bold text-zinc-900">
                            {exp.position}
                          </h3>
                        )}

                        {exp.company && (
                          <p
                            className="text-sm font-medium"
                            style={{
                              color: accentColor,
                            }}
                          >
                            {exp.company}
                          </p>
                        )}
                      </div>

                      {(exp.start_date || exp.end_date || exp.is_current) && (
                        <span className="text-xs text-zinc-500 whitespace-nowrap">
                          {formatDate(exp.start_date)}

                          {exp.start_date && " — "}

                          {exp.is_current
                            ? "Present"
                            : formatDate(exp.end_date)}
                        </span>
                      )}
                    </div>

                    {exp.description?.trim() && (
                      <div className="mt-2 text-sm leading-6 text-zinc-700 whitespace-pre-line">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project?.length > 0 && (
            <section>
              <SectionHeading title="PROJECTS" accentColor={accentColor} />

              <div className="space-y-5">
                {data.project.map((project, index) => (
                  <div key={index} className="relative pl-5">
                    <div
                      className="absolute left-0 top-1.5 bottom-0 w-px"
                      style={{
                        backgroundColor: `${accentColor}35`,
                      }}
                    />

                    <div
                      className="absolute left-[-3px] top-1.5 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: accentColor,
                      }}
                    />

                    <div>
                      {/* Project Name + Type */}
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        {project.name && (
                          <h3 className="text-base font-bold text-zinc-900">
                            {project.name}
                          </h3>
                        )}

                        {project.type && (
                          <span
                            className="text-xs font-medium"
                            style={{
                              color: accentColor,
                            }}
                          >
                            • {project.type}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {project.description?.trim() && (
                        <p className="mt-1.5 text-sm leading-6 text-zinc-700 whitespace-pre-line">
                          {project.description}
                        </p>
                      )}

                      {/* GitHub + Live Demo */}
                      {(project.github || project.live_demo) && (
                        <div className="flex flex-wrap items-center gap-4 mt-3">
                          {project.github && (
                            <a
                              href={normalizeUrl(project.github)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                              style={{
                                color: accentColor,
                              }}
                            >
                              <Github className="size-4" />

                              <span>GitHub Repository</span>
                            </a>
                          )}

                          {project.live_demo && (
                            <a
                              href={normalizeUrl(project.live_demo)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                              style={{
                                color: accentColor,
                              }}
                            >
                              <ExternalLink className="size-4" />

                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* =========================================================
                PRINT STYLES
            ========================================================== */}

      <style>
        {`
                    #minimal-image-resume {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    #minimal-image-resume aside {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    #minimal-image-resume section,
                    #minimal-image-resume aside > div,
                    #minimal-image-resume main > section,
                    #minimal-image-resume .space-y-6 > div,
                    #minimal-image-resume .space-y-5 > div {
                        break-inside: avoid;
                    }

                    @media print {

                        #minimal-image-resume {
                            width: 100%;
                            margin: 0;
                            box-shadow: none !important;
                        }

                        #minimal-image-resume > div {
                            min-height: 100%;
                        }

                        #minimal-image-resume aside {
                            padding: 0.45in;
                        }

                        #minimal-image-resume main {
                            padding: 0.5in;
                        }

                        #minimal-image-resume section {
                            margin-bottom: 16px;
                        }

                        #minimal-image-resume p {
                            orphans: 3;
                            widows: 3;
                        }

                    }
                `}
      </style>
    </div>
  );
};

/* ============================================================
   SIDEBAR HEADING
============================================================ */

const SidebarHeading = ({ title, accentColor }) => {
  return (
    <div className="mb-3">
      <h2
        className="text-xs font-bold tracking-[0.16em]"
        style={{
          color: accentColor,
        }}
      >
        {title}
      </h2>

      <div
        className="mt-2 h-px w-8"
        style={{
          backgroundColor: accentColor,
        }}
      />
    </div>
  );
};

/* ============================================================
   MAIN SECTION HEADING
============================================================ */

const SectionHeading = ({ title, accentColor }) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2
        className="text-xs font-bold tracking-[0.16em] whitespace-nowrap"
        style={{
          color: accentColor,
        }}
      >
        {title}
      </h2>

      <div
        className="h-px flex-1"
        style={{
          backgroundColor: `${accentColor}30`,
        }}
      />
    </div>
  );
};

/* ============================================================
   CONTACT ITEM
============================================================ */

const ContactItem = ({ icon: Icon, value, accentColor }) => {
  return (
    <div className="flex items-start gap-2">
      <Icon
        className="size-4 shrink-0 mt-0.5"
        style={{
          color: accentColor,
        }}
      />

      <span className="break-all">{value}</span>
    </div>
  );
};

export default MinimalImageTemplate;
