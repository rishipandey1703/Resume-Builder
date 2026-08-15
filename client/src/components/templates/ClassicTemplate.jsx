import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";

        const [year, month] = dateStr.split("-");

        if (!year || !month) return dateStr;

        return new Date(Number(year), Number(month) - 1).toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
            }
        );
    };

    const personalInfo = data?.personal_info || {};

    return (
        <div
            id="classic-resume"
            className="w-full bg-white text-gray-800"
            style={{
                fontFamily:
                    "Arial, Helvetica, sans-serif",
            }}
        >
            <div className="px-8 py-8 sm:px-10 sm:py-9">

                {/* ================= HEADER ================= */}
                <header
                    className="pb-5 mb-6 border-b-2"
                    style={{ borderColor: accentColor }}
                >
                    <div className="text-center">

                        <h1
                            className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
                            style={{ color: accentColor }}
                        >
                            {personalInfo.full_name || "Your Name"}
                        </h1>

                        {personalInfo.profession && (
                            <p className="mt-1.5 text-sm font-medium text-gray-600">
                                {personalInfo.profession}
                            </p>
                        )}

                        {/* Contact Information */}
                        <div className="mt-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-600">

                            {personalInfo.email && (
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <Mail
                                        className="size-3.5 shrink-0"
                                        style={{ color: accentColor }}
                                    />
                                    <span className="break-all">
                                        {personalInfo.email}
                                    </span>
                                </div>
                            )}

                            {personalInfo.phone && (
                                <div className="flex items-center gap-1.5">
                                    <Phone
                                        className="size-3.5 shrink-0"
                                        style={{ color: accentColor }}
                                    />
                                    <span>{personalInfo.phone}</span>
                                </div>
                            )}

                            {personalInfo.location && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin
                                        className="size-3.5 shrink-0"
                                        style={{ color: accentColor }}
                                    />
                                    <span>{personalInfo.location}</span>
                                </div>
                            )}

                            {personalInfo.linkedin && (
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <Linkedin
                                        className="size-3.5 shrink-0"
                                        style={{ color: accentColor }}
                                    />
                                    <span className="break-all">
                                        {personalInfo.linkedin}
                                    </span>
                                </div>
                            )}

                            {personalInfo.website && (
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <Globe
                                        className="size-3.5 shrink-0"
                                        style={{ color: accentColor }}
                                    />
                                    <span className="break-all">
                                        {personalInfo.website}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* ================= SUMMARY ================= */}
                {data.professional_summary?.trim() && (
                    <section className="mb-6">
                        <SectionHeading
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
                    <section className="mb-6">
                        <SectionHeading
                            title="PROFESSIONAL EXPERIENCE"
                            accentColor={accentColor}
                        />

                        <div className="space-y-5">
                            {data.experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className="relative pl-4 border-l-2"
                                    style={{
                                        borderColor: accentColor,
                                    }}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">

                                        <div className="min-w-0">
                                            {exp.position && (
                                                <h3 className="text-base font-bold text-gray-900">
                                                    {exp.position}
                                                </h3>
                                            )}

                                            {exp.company && (
                                                <p className="text-sm font-semibold text-gray-600">
                                                    {exp.company}
                                                </p>
                                            )}
                                        </div>

                                        {(exp.start_date ||
                                            exp.end_date ||
                                            exp.is_current) && (
                                            <p className="shrink-0 text-xs sm:text-sm font-medium text-gray-500 sm:text-right">
                                                {formatDate(exp.start_date)}
                                                {exp.start_date && " - "}
                                                {exp.is_current
                                                    ? "Present"
                                                    : formatDate(exp.end_date)}
                                            </p>
                                        )}
                                    </div>

                                    {exp.description?.trim() && (
                                        <div className="mt-2 text-sm leading-6 text-gray-700 whitespace-pre-line">
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
                    <section className="mb-6">
                        <SectionHeading
                            title="PROJECTS"
                            accentColor={accentColor}
                        />

                        <div className="space-y-4">
                            {data.project.map((project, index) => (
                                <div
                                    key={index}
                                    className="relative pl-4 border-l-2 border-gray-200"
                                >
                                    <div>
                                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
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
                                                    {project.type}
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

                {/* ================= EDUCATION ================= */}
                {data.education?.length > 0 && (
                    <section className="mb-6">
                        <SectionHeading
                            title="EDUCATION"
                            accentColor={accentColor}
                        />

                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1"
                                >
                                    <div className="min-w-0">

                                        {(edu.degree || edu.field) && (
                                            <h3 className="text-sm font-bold text-gray-900">
                                                {edu.degree}

                                                {edu.field && (
                                                    <>
                                                        {" "}
                                                        <span className="font-medium">
                                                            in {edu.field}
                                                        </span>
                                                    </>
                                                )}
                                            </h3>
                                        )}

                                        {edu.institution && (
                                            <p className="text-sm font-medium text-gray-600">
                                                {edu.institution}
                                            </p>
                                        )}

                                        {edu.gpa && (
                                            <p className="mt-0.5 text-xs text-gray-500">
                                                GPA: {edu.gpa}
                                            </p>
                                        )}
                                    </div>

                                    {edu.graduation_date && (
                                        <p className="shrink-0 text-xs sm:text-sm font-medium text-gray-500 sm:text-right">
                                            {formatDate(
                                                edu.graduation_date
                                            )}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= SKILLS ================= */}
                {data.skills?.length > 0 && (
                    <section className="mb-2">
                        <SectionHeading
                            title="CORE SKILLS"
                            accentColor={accentColor}
                        />

                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {data.skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1.5 text-sm text-gray-700"
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full shrink-0"
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
            </div>

            {/* ================= PRINT STYLES ================= */}
            <style>
                {`
                    #classic-resume {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    #classic-resume section,
                    #classic-resume header,
                    #classic-resume .space-y-5 > div,
                    #classic-resume .space-y-4 > div {
                        break-inside: avoid;
                    }

                    @media print {
                        #classic-resume {
                            width: 100%;
                            margin: 0;
                            box-shadow: none !important;
                        }

                        #classic-resume > div {
                            padding: 0.55in 0.6in;
                        }

                        #classic-resume h1 {
                            font-size: 26px;
                        }

                        #classic-resume section {
                            margin-bottom: 16px;
                        }

                        #classic-resume p {
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

const SectionHeading = ({ title, accentColor }) => {
    return (
        <div className="mb-3 flex items-center gap-3">
            <h2
                className="text-sm font-bold tracking-wide whitespace-nowrap"
                style={{ color: accentColor }}
            >
                {title}
            </h2>

            <div
                className="h-px flex-1 opacity-25"
                style={{ backgroundColor: accentColor }}
            />
        </div>
    );
};

export default ClassicTemplate;
