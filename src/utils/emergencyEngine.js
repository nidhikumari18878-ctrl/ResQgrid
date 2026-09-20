export function calculatePriority({
  risk = 0,
  people = 0,
  urgency = 0,
  accessibility = 100,
}) {
  const normalizedPeople = Math.min(people, 100);

  const accessibilityRisk = 100 - accessibility;

  const score =
    risk * 0.35 +
    normalizedPeople * 0.25 +
    urgency * 0.25 +
    accessibilityRisk * 0.15;

  return Math.round(Math.min(score, 100));
}

export function getPriorityLevel(score) {
  if (score >= 80) {
    return {
      label: "CRITICAL",
      color: "red",
    };
  }

  if (score >= 60) {
    return {
      label: "HIGH",
      color: "orange",
    };
  }

  if (score >= 40) {
    return {
      label: "MEDIUM",
      color: "yellow",
    };
  }

  return {
    label: "LOW",
    color: "green",
  };
}

export function allocateResource(incident, teams) {
  if (!teams?.length) return null;

  const scoredTeams = teams.map((team) => {
    const distanceScore = Math.max(
      0,
      100 - team.distance * 8
    );

    const capabilityMatch =
      incident.type === "Flood" &&
      team.capability === "Flood Rescue"
        ? 100
        : incident.type === "Medical" &&
          team.capability === "Medical Emergency"
        ? 100
        : incident.type === "Fire" &&
          team.capability === "General Rescue"
        ? 75
        : 60;

    const score = Math.round(
      team.availability * 0.4 +
        distanceScore * 0.3 +
        capabilityMatch * 0.3
    );

    return {
      ...team,
      allocationScore: score,
    };
  });

  return scoredTeams.sort(
    (a, b) =>
      b.allocationScore - a.allocationScore
  )[0];
}