const MinimalTemplate = ({ data, accentColor }) => {
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

    const cleanUrl = (url) => {
        if (!url) return "";

        return url
            .replace(/^https?:\/\/(www\.)?/, "")
            .replace(/\/$/, "");
    };

    return (
        <div
            id="minimal-resume"
            className="w-full bg-white text-gray-900"
            style={{
                fontFamily: "Arial, Helvetica, sans-serif",
            }}
        >
            <div className="px-8 py-9 sm:px-10 sm:py-10">

                {/* ================= HEADER ================= */}
                <header className="mb-8">

                    <div className="flex flex-col gap-1">

                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                            {personalInfo.full_name || "Your Name"}
                        </h1>

                        {personalInfo.profession && (
                            <p
                                className="text-sm font-medium"
                                style={{ color: accentColor }}
                            >
                                {personalInfo.profession}
                            </p>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-gray-500">

                        {personalInfo.email && (
                            <span className="break-all">
                                {personalInfo.email}
                            </span>
                        )}

                        {personalInfo.phone && (
                            <span>{personalInfo.phone}</span>
                        )}

                        {personalInfo.location && (
                            <span>{personalInfo.location}</span>
                        )}

                        {personalInfo.linkedin && (
                            <a
                                href={personalInfo.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="break-all hover:underline"
                                style={{ color: accentColor }}
                            >
                                {cleanUrl(personalInfo.linkedin)}
                            </a>
                        )}

                        {personalInfo.website && (
                            <a
                                href={personalInfo.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="break-all hover:underline"
                                style={{ color: accentColor }}
                            >
                                {cleanUrl(personalInfo.website)}
                            </a>
                        )}
                    </div>

                    {/* Accent line */}
                    <div
                        className="mt-5 h-1 w-16 rounded-full"
                        style={{
                            backgroundColor: accentColor,
                        }}
                    />
                </header>

                {/* ================= SUMMARY ================= */}
                {data.professional_summary?.trim() && (
                    <section className="mb-8">
                        <p className="max-w-3xl text-sm leading-6 text-gray-700">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* ================= EXPERIENCE ================= */}
                {data.experience?.length > 0 && (
                    <section className="mb-8">
                        <MinimalHeading
                            title="EXPERIENCE"
                            accentColor={accentColor}
                        />

                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1"
                                >
                                    <div>
                                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">

                                            {exp.position && (
                                                <h3 className="text-base font-bold text-gray-900">
                                                    {exp.position}
                                                </h3>
                                            )}

                                            {exp.company && (
                                                <span
                                                    className="text-sm font-medium"
                                                    style={{
                                                        color: accentColor,
                                                    }}
                                                >
                                                    {exp.company}
                                                </span>
                                            )}
                                        </div>

                                        {exp.description?.trim() && (
                                            <div className="mt-2 text-sm leading-6 text-gray-700 whitespace-pre-line">
                                                {exp.description}
                                            </div>
                                        )}
                                    </div>

                                    {(exp.start_date ||
                                        exp.end_date ||
                                        exp.is_current) && (
                                        <div className="text-xs sm:text-sm text-gray-500 sm:text-right whitespace-nowrap">
                                            {formatDate(exp.start_date)}

                                            {exp.start_date && " — "}

                                            {exp.is_current
                                                ? "Present"
                                                : formatDate(exp.end_date)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= PROJECTS ================= */}
                {data.project?.length > 0 && (
                    <section className="mb-8">
                        <MinimalHeading
                            title="PROJECTS"
                            accentColor={accentColor}
                        />

                        <div className="space-y-5">
                            {data.project.map((project, index) => (
                                <div key={index}>

                                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">

                                        {project.name && (
                                            <h3 className="text-base font-bold text-gray-900">
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
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= EDUCATION ================= */}
                {data.education?.length > 0 && (
                    <section className="mb-8">
                        <MinimalHeading
                            title="EDUCATION"
                            accentColor={accentColor}
                        />

                        <div className="space-y-5">
                            {data.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-x-6 gap-y-1"
                                >
                                    <div>

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
                                            <p className="mt-0.5 text-sm text-gray-600">
                                                {edu.institution}
                                            </p>
                                        )}

                                        {edu.gpa && (
                                            <p className="mt-1 text-xs text-gray-500">
                                                GPA: {edu.gpa}
                                            </p>
                                        )}
                                    </div>

                                    {edu.graduation_date && (
                                        <span className="text-xs sm:text-sm text-gray-500 sm:text-right whitespace-nowrap">
                                            {formatDate(
                                                edu.graduation_date
                                            )}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ================= SKILLS ================= */}
                {data.skills?.length > 0 && (
                    <section>
                        <MinimalHeading
                            title="SKILLS"
                            accentColor={accentColor}
                        />

                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                            {data.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="flex items-center gap-1.5 text-sm text-gray-700"
                                >
                                    <span
                                        className="h-1.5 w-1.5 rounded-full"
                                        style={{
                                            backgroundColor: accentColor,
                                        }}
                                    />

                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* ================= PRINT STYLES ================= */}
            <style>
                {`
                    #minimal-resume {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    #minimal-resume section,
                    #minimal-resume header,
                    #minimal-resume .space-y-6 > div,
                    #minimal-resume .space-y-5 > div {
                        break-inside: avoid;
                    }

                    @media print {
                        #minimal-resume {
                            width: 100%;
                            margin: 0;
                            box-shadow: none !important;
                        }

                        #minimal-resume > div {
                            padding: 0.55in 0.6in;
                        }

                        #minimal-resume section {
                            margin-bottom: 16px;
                        }

                        #minimal-resume p {
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

const MinimalHeading = ({ title, accentColor }) => {
    return (
        <div className="mb-4 flex items-center gap-3">

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

export default MinimalTemplate;
