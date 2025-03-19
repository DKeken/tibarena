/**
 * This file contains all default values used across database schemas
 * Centralizing these values ensures consistency and makes changes easier
 */

// Gladiator defaults
export const gladiatorDefaults = {
  // Default equipment for new gladiators
  equipment: {
    weapon: {
      type: "sword" as const,
      name: null,
    },
    armor: {
      type: "light" as const,
      name: null,
    },
  },

  // Default attributes for new gladiators
  attributes: {
    strength: 10,
    agility: 10,
    vitality: 10,
  },

  // Default progress data for new gladiators
  progress: {
    experience: 0,
    level: 1,
    wins: 0,
    losses: 0,
  },
};

// Reward defaults
export const rewardDefaults = {
  // Default reward data
  rewardData: {
    coins: 0,
    experience: 0,
    items: [],
  },
};

// Battle defaults
export const battleDefaults = {
  // Default battle status
  status: "scheduled" as const,
  // Default rounds completed
  roundsCompleted: 0,
};

// Transaction defaults
export const transactionDefaults = {
  // Default transaction status
  status: "pending" as const,
  // Default transaction details
  details: {},
};

// NFT defaults
export const nftDefaults = {
  // Default NFT metadata
  metadata: {
    name: "",
    description: "",
    attributes: [],
  },
  // Default NFT rarity
  rarityTier: "common" as const,
  // Default rental status
  isRented: false,
};

// Mission defaults
export const missionDefaults = {
  // Default target count to complete a mission
  targetCount: 1,
  // Default active status
  isActive: true,
};

// Player mission progress defaults
export const missionProgressDefaults = {
  // Default progress count
  currentCount: 0,
  // Default completion status
  isCompleted: false,
  // Default reward claimed status
  rewardClaimed: false,
};

// Streak defaults
export const streakDefaults = {
  // Default streak counts
  currentStreak: 1,
  maxStreak: 1,
};

// Player reward defaults
export const playerRewardDefaults = {
  // Default reward status
  status: "available" as const,
  // Default free battle settings
  includesFreeBattles: false,
  freeBattlesCount: 0,
  // Default streak bonus status
  isStreakBonus: false,
};
