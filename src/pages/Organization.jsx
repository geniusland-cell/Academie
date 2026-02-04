import { useState, useEffect } from "react";
import { buildHierarchyTree, getAllMembers } from "../config";
import { Users, ChevronDown, ChevronUp } from "lucide-react";
import "./Organization.css";

const getCardBackgroundColor = (role, isHighlighted) => {
  if (isHighlighted) return "#FCD34D";

  switch (role) {
    case "Fondateur":
      return "#1E3A5F";
    case "Gérant":
      return "#4B7BA7";
    case "Leader":
      return "#A5A5A5";
    case "Chef Équipe":
      return "#D9D9D9";
    default:
      return "#FFFFFF";
  }
};

const getTextColor = (role) => {
  switch (role) {
    case "Fondateur":
    case "Gérant":
      return "white";
    case "Leader":
    case "Chef Équipe":
    default:
      return "#333333";
  }
};

const MemberCard = ({ member, isHighlighted = false }) => {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const bgColor = getCardBackgroundColor(member.role, isHighlighted);
  const textColor = getTextColor(member.role);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        className="org-member-card"
        style={{
          background: bgColor,
          borderRadius: "12px",
          padding: "0.75rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          textAlign: "center",
          transition: "all 0.3s ease",
          minWidth: "100px",
        }}
      >
        {/* Avatar circulaire avec initiales */}
        <div
          className="org-avatar"
          style={{
            position: "relative",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, #c41e3a 0%, #8b1528 100%)`,
            margin: "0 auto 0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            border: "2px solid #c41e3a",
          }}
        >
          {initials}
        </div>

        <h4
          style={{
            fontSize: "11px",
            fontWeight: "600",
            margin: "0 0 0.25rem 0",
            color: textColor,
            lineHeight: "1.2",
          }}
        >
          {member.name}
        </h4>

        {/* ADN */}
        <p
          style={{
            fontSize: "10px",
            color: textColor,
            fontWeight: "700",
            margin: "0",
            letterSpacing: "0.5px",
            fontFamily: "monospace",
          }}
        >
          {member.adn}
        </p>

        {/* Status dot */}
        <div
          style={{
            height: "6px",
            borderRadius: "50%",
            background: member.status === "active" ? "#4caf50" : "#ff6b6b",
            margin: "0.4rem auto 0",
          }}
        />
      </div>

      {/* Flag + Nationalité - EN BAS À DROITE de la carte */}
      <div
        style={{
          position: "absolute",
          bottom: "-6px",
          right: "-6px",
          display: "flex",
          alignItems: "center",
          gap: "2px",
          fontSize: "9px",
          color: "#666",
          backgroundColor: "white",
          padding: "2px 5px",
          borderRadius: "5px",
          border: "1px solid #e5e5e5",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: "12px" }}>{member.flagEmoji}</span>
        <span>{member.nationality}</span>
      </div>
    </div>
  );
};

const OrganizationTree = ({ node, level = 0, expandedNodes, toggleNode }) => {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes[node.adn] || false;
  const isFondateur = node.role === "Fondateur";
  const isLeader = node.role === "Leader";

  if (isFondateur) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.5rem",
        }}
      >
        {/* PDG au centre */}
        <MemberCard member={node} />

        {hasChildren && (
          <>
            <div
              style={{
                width: "3px",
                height: "2.5rem",
                background:
                  "linear-gradient(to bottom, #1E3A5F 0%, #4B7BA7 100%)",
              }}
            />

            <div
              className="org-branches-container"
              style={{
                position: "relative",
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: "0.5rem",
                flexWrap: "wrap",
                maxWidth: `${Math.min(node.children.length * 400, 1200)}px`,
                margin: "0 auto",
              }}
            >
              {node.children.length > 1 && (
                <div
                  className="org-line-horizontal"
                  style={{
                    position: "absolute",
                    top: "-2.5rem",
                    left: "0",
                    right: "0",
                    height: "3px",
                    background:
                      "linear-gradient(to right, transparent, #4B7BA7 15%, #4B7BA7 85%, transparent)",
                  }}
                />
              )}

              {node.children.map((gerant) => (
                <div
                  className="org-gap-gerants"
                  key={gerant.adn}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                >
                  <div
                    className="org-line-vertical"
                    style={{
                      width: "3px",
                      height: "1.5rem",
                      background:
                        "linear-gradient(to bottom, #4B7BA7 0%, #A5A5A5 100%)",
                    }}
                  />

                  <div style={{ position: "relative" }}>
                    <MemberCard member={gerant} />
                    {gerant.children && gerant.children.length > 0 && (
                      <button
                        onClick={() => toggleNode(gerant.adn)}
                        className="org-button-toggle"
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          background: "#4B7BA7",
                          border: "none",
                          borderRadius: "50%",
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          color: "white",
                          padding: 0,
                        }}
                      >
                        {isExpanded && gerant.adn === gerant.adn ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    )}
                  </div>

                  {gerant.children &&
                    gerant.children.length > 0 &&
                    expandedNodes[gerant.adn] && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "1.5rem",
                        }}
                      >
                        <div
                          style={{
                            width: "3px",
                            height: "1.5rem",
                            background:
                              "linear-gradient(to bottom, #A5A5A5 0%, #8B8B8B 100%)",
                          }}
                        />

                        <div
                          style={{
                            display: "flex",
                            gap: "2rem",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            maxWidth: `${Math.min(gerant.children.length * 400, 1200)}px`,
                            margin: "0 auto",
                          }}
                        >
                          {gerant.children.map((leader) => (
                            <OrganizationTree
                              key={leader.adn}
                              node={leader}
                              level={2}
                              expandedNodes={expandedNodes}
                              toggleNode={toggleNode}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  if (isLeader) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div style={{ position: "relative" }}>
          <MemberCard member={node} />
          {hasChildren && (
            <button
              onClick={() => toggleNode(node.adn)}
              style={{
                position: "absolute",
                bottom: "8px",
                right: "8px",
                background: "#A5A5A5",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                padding: 0,
              }}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>

        {/* Enfants du Leader (Chefs d'équipe) - COLLAPSIBLE */}
        {hasChildren && isExpanded && (
          <>
            <div
              style={{ width: "2px", height: "1rem", background: "#D1D5DB" }}
            />
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {node.children.map((child) => (
                <OrganizationTree
                  key={child.adn}
                  node={child}
                  level={level + 1}
                  expandedNodes={expandedNodes}
                  toggleNode={toggleNode}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // ========== AFFICHAGE DES CHEFS D'ÉQUIPE (COLLAPSIBLE) ET MEMBRES ==========
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.8rem",
      }}
    >
      {/* Chef d'équipe avec bouton +/- si enfants */}
      <div style={{ position: "relative" }}>
        <MemberCard member={node} />
        {hasChildren && (
          <button
            onClick={() => toggleNode(node.adn)}
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              background: "#D9D9D9",
              border: "none",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#707070",
              padding: 0,
            }}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>

      {/* Membres - affichés si Chef d'équipe est expanded (ou si pas enfants = Membre) */}
      {hasChildren && isExpanded && (
        <>
          <div
            style={{ width: "2px", height: "1rem", background: "#A5A5A5" }}
          />
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {node.children.map((child) => (
              <OrganizationTree
                key={child.adn}
                node={child}
                level={level + 1}
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
              />
            ))}
          </div>
        </>
      )}

      {/* Si c'est un Membre (pas d'enfants), ne rien afficher de plus */}
    </div>
  );
};

export const Organization = () => {
  const [data, setData] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({}); // Gère quels nœuds sont ouverts

  const toggleNode = (adn) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [adn]: !prev[adn],
    }));
  };

  useEffect(() => {
    // Récupérer l'ADN de l'utilisateur connecté
    const userAdn = localStorage.getItem("userAdn") || "1.A.D";

    // Construire l'arbre hiérarchique
    const tree = buildHierarchyTree(userAdn);

    // Calculer les statistiques
    const allMembers = getAllMembers().filter(
      (m) => m.adn.startsWith(userAdn + ".") || m.adn === userAdn,
    );
    const subordinates = allMembers.filter((m) => m.adn !== userAdn);

    // Update state une fois avec les deux valeurs combinées
    setData({
      treeData: tree,
      stats: {
        totalSubordinates: subordinates.length,
        activeMembers: subordinates.filter((m) => m.status === "active").length,
        inactiveMembers: subordinates.filter((m) => m.status === "inactive")
          .length,
      },
    });
  }, []);

  if (!data) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Chargement de l'organigramme...
      </div>
    );
  }

  return (
    <div
      className="org-container"
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
        padding: "2rem 1.5rem",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          alignItems: "center",
          marginBottom: "2.5rem",
        }}
      >
        <div style={{ color: "#c41e3a", flexShrink: 0 }}>
          <Users size={32} strokeWidth={1.5} fill="none" />
        </div>
        <div>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "700",
              margin: "0 0 0.5rem 0",
              color: "#1a1a1a",
            }}
          >
            Mon Organigramme
          </h1>
          <p
            style={{
              margin: "0",
              color: "#666",
              fontSize: "0.95rem",
            }}
          >
            Visualisez votre structure hiérarchique
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            background: "white",
            border: "2px solid #e5e5e5",
            borderRadius: "12px",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#c41e3a",
              marginBottom: "0.5rem",
            }}
          >
            {data.stats.totalSubordinates}
          </div>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>
            Total Subalternes
          </div>
        </div>

        <div
          style={{
            background: "rgba(76, 175, 80, 0.05)",
            border: "2px solid #4caf50",
            borderRadius: "12px",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#4caf50",
              marginBottom: "0.5rem",
            }}
          >
            {data.stats.activeMembers}
          </div>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>Actifs</div>
        </div>

        <div
          style={{
            background: "rgba(255, 107, 107, 0.05)",
            border: "2px solid #ff6b6b",
            borderRadius: "12px",
            padding: "1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#ff6b6b",
              marginBottom: "0.5rem",
            }}
          >
            {data.stats.inactiveMembers}
          </div>
          <div style={{ fontSize: "0.9rem", color: "#666" }}>Inactifs</div>
        </div>
      </div>

      {/* Organigramme */}
      <div
        style={{
          background: "white",
          border: "2px solid #e5e5e5",
          borderRadius: "12px",
          padding: "3rem 2rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            margin: "0 0 2rem 0",
            color: "#1a1a1a",
          }}
        >
          Arborescence
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <OrganizationTree
            node={data.treeData}
            expandedNodes={expandedNodes}
            toggleNode={toggleNode}
          />
        </div>
      </div>
    </div>
  );
};
