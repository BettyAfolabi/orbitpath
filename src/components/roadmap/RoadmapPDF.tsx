import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { Roadmap } from "@/lib/generateRoadmap";


const PHASE_COLORS = ["#0ea5e9", "#8b5cf6", "#10b981"];

const s = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 48,
  },
  // Header
  eyebrow: { fontSize: 8, color: "#0284c7", letterSpacing: 2, textTransform: "uppercase", textAlign: "center", marginBottom: 8 },
  headline: { fontSize: 26, fontWeight: 700, color: "#0f172a", textAlign: "center", marginBottom: 6, lineHeight: 1.2 },
  summary: { fontSize: 10, color: "#64748b", textAlign: "center", lineHeight: 1.6, marginBottom: 20 },
  careerPill: { alignSelf: "center", borderRadius: 12, borderWidth: 1, borderColor: "#bae6fd", backgroundColor: "#f0f9ff", paddingVertical: 10, paddingHorizontal: 24, marginBottom: 8 },
  careerTrack: { fontSize: 18, fontWeight: 700, color: "#0f172a", textAlign: "center" },
  careerLabel: { fontSize: 8, color: "#94a3b8", textAlign: "center", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 },
  connectorText: { fontSize: 9, color: "#94a3b8", textAlign: "center", marginBottom: 28 },
  divider: { height: 1, backgroundColor: "#e2e8f0", marginBottom: 28 },
  // Phases
  phaseContainer: { marginBottom: 24 },
  phaseHeader: { borderLeftWidth: 2, paddingLeft: 12, marginBottom: 12 },
  phaseLabel: { fontSize: 8, letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 },
  phaseTitle: { fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 2 },
  phaseSummary: { fontSize: 9, color: "#64748b", lineHeight: 1.5 },
  // Milestone grid
  milestoneGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  milestoneCard: { width: "48.5%", borderRadius: 8, borderWidth: 1, borderColor: "#e2e8f0", backgroundColor: "#f8fafc", padding: 12 },
  milestoneTitle: { fontSize: 10, fontWeight: 700, color: "#0f172a", marginBottom: 4 },
  milestoneDesc: { fontSize: 8.5, color: "#64748b", lineHeight: 1.5, marginBottom: 6 },
  tag: { alignSelf: "flex-start", borderRadius: 4, backgroundColor: "#f1f5f9", paddingVertical: 2, paddingHorizontal: 6 },
  tagText: { fontSize: 7.5, color: "#64748b" },
  // Programs
  sectionTitle: { fontSize: 12, fontWeight: 700, color: "#0f172a", marginBottom: 12, marginTop: 8 },
  programCard: { borderRadius: 8, borderWidth: 1, borderColor: "#e2e8f0", backgroundColor: "#f8fafc", padding: 12, marginBottom: 8 },
  programName: { fontSize: 10, fontWeight: 700, color: "#0f172a", marginBottom: 2 },
  programOrg: { fontSize: 8.5, color: "#0284c7", marginBottom: 4 },
  programDesc: { fontSize: 8.5, color: "#64748b", lineHeight: 1.5 },
  resourcesLabel: { fontSize: 7, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 8, marginBottom: 4 },
  resourceLink: { fontSize: 8, color: "#0284c7", marginBottom: 3 },
  // Encouragement
  encouragementBox: { borderRadius: 12, borderWidth: 1, borderColor: "#bae6fd", backgroundColor: "#f0f9ff", padding: 20, marginTop: 24 },
  encouragementText: { fontSize: 11, color: "#334155", textAlign: "center", lineHeight: 1.6, },
  // Footer
  footer: { position: "absolute", bottom: 24, left: 48, right: 48, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 7.5, color: "#94a3b8" },
});

export default function RoadmapPDF({ roadmap }: { roadmap: Roadmap }) {
  return (
    <Document title={`Space Career Roadmap — ${roadmap.career_track}`}>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <Text style={s.eyebrow}>Your Space Career Roadmap</Text>
        <Text style={s.headline}>{roadmap.headline}</Text>
        <Text style={s.summary}>{roadmap.summary}</Text>

        <Text style={s.careerLabel}>Your career destination</Text>
        <View style={s.careerPill}>
          <Text style={s.careerTrack}>{roadmap.career_track}</Text>
        </View>
        <Text style={s.connectorText}>Here‘s how to get there</Text>
        <View style={s.divider} />

        {/* Phases */}
        {roadmap.phases.map((phase, i) => (
          <View key={phase.id} style={s.phaseContainer} wrap={false}>
            <View style={[s.phaseHeader, { borderLeftColor: PHASE_COLORS[i % PHASE_COLORS.length] }]}>
              <Text style={[s.phaseLabel, { color: PHASE_COLORS[i % PHASE_COLORS.length] }]}>
                Phase {i + 1}
              </Text>
              <Text style={s.phaseTitle}>{phase.title}</Text>
              <Text style={s.phaseSummary}>{phase.summary}</Text>
            </View>

            <View style={s.milestoneGrid}>
              {phase.milestones.map((m) => (
                <View key={m.id} style={s.milestoneCard}>
                  <Text style={s.milestoneTitle}>{m.title}</Text>
                  <Text style={s.milestoneDesc}>{m.description}</Text>
                  <View style={s.tag}>
                    <Text style={s.tagText}>{m.timeframe}</Text>
                  </View>

                  {m.resources?.length > 0 && (
                    <>
                      <Text style={s.resourcesLabel}>Resources</Text>
                      {m.resources.map((r, i) => (
                        <Link key={i} src={r.url} style={s.resourceLink}>
                          {r.title}
                        </Link>
                      ))}
                    </>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Recommended Programs */}
        {roadmap.recommended_programs?.length > 0 && (
          <View>
            <Text style={s.sectionTitle}>Recommended Programs</Text>
            {roadmap.recommended_programs.map((p, i) => (
              <View key={i} style={s.programCard}>
                <Text style={s.programName}>{p.name}</Text>
                <Text style={s.programOrg}>{p.organization}</Text>
                <Text style={s.programDesc}>{p.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Encouragement */}
        <View style={s.encouragementBox}>
          <Text style={s.encouragementText}>“{roadmap.encouragement}“</Text>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>OrbitPath — Space Career Pathfinder</Text>
          <Text style={s.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}