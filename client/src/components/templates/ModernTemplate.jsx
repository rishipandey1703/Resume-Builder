import {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Globe,
} from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";

        const [year, month] = dateStr.split("-");

        if (!year || !month) return dateStr;

        return new Date(
            Number(year),
            Number(month) - 1
        ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
        });
    };

    const personalInfo = data?.personal_info || {};

    const cleanUrl = (url, type) => {
        if (!url) return "";

        if (type === "linkedin") {
            return url
                .replace(/^https?:\/\/(www\.)?/, "")
                .replace(/\/$/, "");
        }

        return url
            .replace(/^https?:\/\/(www\.)?/, "")
            .replace(/\/$/, "");
    };

    return (
        <div
            id="modern-resume"
            className="w-full bg-white text-gray-800"
            style={{
                fontFamily: "Arial, Helvetica, sans-serif",
            }}
        >
            {/* ================= HEADER ================= */}
            <header
                className="px-8 py-8 sm:px-10"
                style={{
                    backgroundColor: accentColor,
                }}
            >
                <div className="flex flex-col gap-4">

                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                            {personalInfo.full_name || "Your Name"}
                        </h1>

                        {personalInfo.profession && (
                            <p className="mt-1.5 text-sm sm:text-base font-medium text-white/90">
                                {personalInfo.profession}
                            </p>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/95">

                        {personalInfo.email && (
                            <div className="flex items-center gap-1.5 min-w-0">
                                <Mail className="size-3.5 shrink-0" />
                                <span className="break-all">
                                    {personalInfo.email}
                                </span>
                            </div>
                        )}

                        {personalInfo.phone && (
                            <div className="flex items-center gap-1.5">
                                <Phone className="size-3.5 shrink-0" />
                                <span>
                                    {personalInfo.phone}
                                </span>
                            </div>
                        )}

                        {personalInfo.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="size-3.5 shrink-0" />
                                <span>
                                    {personalInfo.location}
                                </span>
                            </div>
                        )}

                        {personalInfo.linkedin && (
                            <a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 min-w-0 hover:opacity-80 transition-opacity"
                            >
                                <Linkedin className="size-3.5 shrink-0" />

                                <span className="break-all">
                                    {cleanUrl(
                                        personalInfo.linkedin,
                                        "linkedin"
                                    )}
                                </span>
                            </a>
                        )}

                        {personalInfo.website && (
                            <a
                                href={personalInfo.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 min-w-0 hover:opacity-80 transition-opacity"
                            >
                                <Globe className="size-3.5 shrink-0" />

                                <span className="break-all">
                                    {cleanUrl(
                                        personalInfo.website,
                                        "website"
                                    )}
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* ================= CONTENT ================= */}
            <main className="px-8 py-8 sm:px-10">

                {/* ================= SUMMARY ================= */}
                {data.professional_summary?.trim() && (
                    <section className="mb-7">
                        <ModernSectionHeading
                            title="PROFESSIONAL SUMMARY"
                            accentColor={accentColor}
                        />

                        <p className="text-sm leading-6 text-gray-700">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* ================= EXPERIENCE ================= */}
                {data.experience?.length > 0 && (
                    <section className="mb-7">
                        <ModernSectionHeading
                            title="EXPERIENCE"
                            accentColor={accentColor}
                        />

                        <div className="space-y-5">
                            {data.experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className="relative pl-5"
                                >
                                    {/* Timeline line */}
                                    <div
                                        className="absolute left-0 top-1.5 bottom-0 w-0.5"
                                        style={{
                                            backgroundColor: `${accentColor}35`,
                                        }}
                                    />

                                    {/* Timeline dot */}
                                    <div
                                        className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                                        style={{
                                            backgroundColor: accentColor,
                                        }}
                                    />

                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">

                                        <div className="min-w-0">
                                            {exp.position && (
                                                <h3 className="text-base font-bold text-gray-900">
                                                    {exp.position}
                                                </h3>
                                            )}

                                            {exp.company && (
                                                <p
                                                    className="text-sm font-semibold"
                                                    style={{
                                                        color: accentColor,
                                                    }}
                                                >
                                                    {exp.company}
                                                </p>
                                            )}
                                        </div>

                                        {(exp.start_date ||
                                            exp.end_date ||
                                            exp.is_current) && (
                                            <span
                                                className="w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
                                                style={{
                                                    backgroundColor: `${accentColor}12`,
                                                    color: accentColor,
                                                }}
                                            >
                                                {formatDate(
                                                    exp.start_date
                                                )}

                                                {exp.start_date && " - "}

                                                {exp.is_current
                                                    ? "Present"
                                                    : formatDate(
                                                          exp.end_date
                                                      )}
                                            </span>
                                        )}
                                    </div>

                                    {exp.description?.trim() && (
                                        <div className="mt-2.5 text-sm leading-6 text-gray-700 whitespace-pre-line">
                                            {exp.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= PROJECTS ================= */}
                {data.project?.length > 0 && (
                    <section className="mb-7">
                        <ModernSectionHeading
                            title="PROJECTS"
                            accentColor={accentColor}
                        />

                        <div className="space-y-4">
                            {data.project.map((project, index) => (
                                <div
                                    key={index}
                                    className="relative pl-5"
                                >
                                    <div
                                        className="absolute left-0 top-1.5 bottom-0 w-0.5"
                                        style={{
                                            backgroundColor: `${accentColor}35`,
                                        }}
                                    />

                                    <div
                                        className="absolute left-[-4px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                                        style={{
                                            backgroundColor: accentColor,
                                        }}
                                    />

                                    <div>
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            {project.name && (
                                                <h3 className="text-sm font-bold text-gray-900">
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

                                        {project.description?.trim() && (
                                            <p className="mt-1.5 text-sm leading-6 text-gray-700">
                                                {project.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= EDUCATION + SKILLS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <ModernSectionHeading
                                title="EDUCATION"
                                accentColor={accentColor}
                            />

                            <div className="space-y-4">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        {(edu.degree || edu.field) && (
                                            <h3 className="text-sm font-bold text-gray-900">
                                                {edu.degree}

                                                {edu.field && (
                                                    <span className="font-medium">
                                                        {" "}
                                                        in {edu.field}
                                                    </span>
                                                )}
                                            </h3>
                                        )}

                                        {edu.institution && (
                                            <p
                                                className="mt-0.5 text-sm font-medium"
                                                style={{
                                                    color: accentColor,
                                                }}
                                            >
                                                {edu.institution}
                                            </p>
                                        )}

                                        <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-gray-500">
                                            {edu.graduation_date && (
                                                <span>
                                                    {formatDate(
                                                        edu.graduation_date
                                                    )}
                                                </span>
                                            )}

                                            {edu.gpa && (
                                                <span>
                                                    GPA: {edu.gpa}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <ModernSectionHeading
                                title="SKILLS"
                                accentColor={accentColor}
                            />

                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-2.5 py-1 rounded-md text-xs font-medium border"
                                        style={{
                                            color: accentColor,
                                            borderColor: `${accentColor}45`,
                                            backgroundColor: `${accentColor}0D`,
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {/* ================= PRINT STYLES ================= */}
            <style>
                {`
                    #modern-resume {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    #modern-resume header {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    #modern-resume section,
                    #modern-resume header,
                    #modern-resume .space-y-5 > div,
                    #modern-resume .space-y-4 > div {
                        break-inside: avoid;
                    }

                    @media print {
                        #modern-resume {
                            width: 100%;
                            margin: 0;
                            box-shadow: none !important;
                        }

                        #modern-resume main {
                            padding: 0.55in 0.6in;
                        }

                        #modern-resume header {
                            padding: 0.45in 0.6in;
                        }

                        #modern-resume section {
                            margin-bottom: 15px;
                        }

                        #modern-resume p {
                            orphans: 3;
                            widows: 3;
                        }
                    }
                `}
            </style>
        </div>
    );
};


/* ================= SECTION HEADING ================= */

const ModernSectionHeading = ({ title, accentColor }) => {
    return (
        <div className="flex items-center gap-3 mb-3">
            <h2
                className="text-sm font-bold tracking-[0.08em] whitespace-nowrap"
                style={{ color: accentColor }}
            >
                {title}
            </h2>

            <div
                className="h-px flex-1"
                style={{
                    backgroundColor: `${accentColor}35`,
                }}
            />
        </div>
    );
};

export default ModernTemplate;
