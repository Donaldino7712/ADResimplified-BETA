import { DC } from "../../constants";

const rebuyable = props => {
  props.cost = () => getHybridCostScaling(
    player.machine.rebuyables[props.id],
    1e30,
    props.initialCost,
    props.costMult,
    props.costMult / 10,
    DC.E309,
    1e3,
    props.initialCost * props.costMult
  );
  if (!props.maxUpgrades) props.maxUpgrades = Infinity;
  props.isRebuyable = true;
  const { effect } = props;
  if (props.effect) props.effect = purchases => effect(purchases ?? player.machine.rebuyables[props.id]);
  if (!props.formatCost) props.formatCost = value => format(value, 2, 0);
  return props;
};

export const fabricUpgrades = [
  {
    name: "Infinite Improvement",
    id: 1,
    cost: 15,
    description: "Reality Fabric improves the Infinity Pount formula",
    effect: () => {
      let e = Currency.realityFabric.value.pow(0.2);
      if (e.gt(50)) e = DC.D50.add(e.sub(50).pow(0.2));
      return e.toNumber();
    },
    formatEffect: value => `-${format(value, 2, 2)}`,
    cap: 100
  },
  {
    name: "Eternal Enhancement",
    id: 2,
    cost: 15,
    description: "Reality Fabric improves the Eternity Point formula",
    effect: () => {
      let e = Currency.realityFabric.value.pow(0.15);
      if (e.gt(25)) e = DC.D25.add(e.sub(25).pow(0.15));
      return e.toNumber();
    },
    formatEffect: value => `-${format(value, 2, 2)}`,
    cap: 50
  },
  {
    name: "Mechanical Reality",
    id: 3,
    cost: 15,
    description: "Reality Fabric improves the Reality Machines formula",
    effect: () => {
      let e = Currency.realityFabric.value.pow(0.1);
      if (e.gt(250)) e = DC.D250.add(e.sub(250).pow(0.4));
      return e.toNumber();
    },
    formatEffect: value => `-${format(value, 2, 2)}`,
    cap: 1000
  },
  rebuyable({
    name: "Realistic Refinement",
    id: 4,
    initialCost: 10,
    costMult: 100,
    description: "Improve the Reality Fabric formula",
    effect: p => p,
    formatEffect: value => {
      if (value <= 8) return `log${format(10 - value)}(x)`;
      return `x${formatPow(value / 1000 + 0.01, 2, 2)}`;
    }
  }),
  {
    name: "Dilated Space",
    id: 5,
    cost: 15,
    description: "Gain a power to Dilated Time gain based on Reality Fabric",
    effect: () => {
      let e = 1 + Currency.realityFabric.value.log10() / 1e4;
      if (e >= 1.01) e = 1.01 + e / 10;
      return e;
    },
    formatEffect: value => formatPow(value, 5, 5)
  },
  {
    name: "Multiplicative Machines",
    id: 6,
    cost: 15,
    description: "Gain a multiplier to Reality Machines based on Reality Fabric",
    effect: () => Currency.realityFabric.value.div(Currency.realityFabric.value.ln()).sqrt()
      .clampMax(Number.MAX_VALUE).toNumber(),
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Tachyonic Time",
    id: 7,
    cost: 50,
    description: "Decrease the Tachyon Galaxy threshold based on Reality Fabric",
    effect: () => {
      let e = Currency.realityFabric.value.log10() / 1000;
      if (e >= 0.05) e = 0.05 + (e - 0.05) / 100;
      return 1 - e;
    },
    formatEffect: value => formatX(value, 4, 4)
  },
  rebuyable({
    name: "Futuristic Fabric",
    id: 8,
    initialCost: 100,
    costMult: 1e3,
    description: () => `Multiply Reality Fabric gain by ${formatX(3)}`,
    effect: p => 3 ** p,
    formatEffect: value => formatX(value, 2, 0)
  }),
  {
    name: "Compounded Conversion",
    id: 9,
    cost: 50,
    description: "Reality Fabric improves Infinity Power conversion",
    effect: () => Currency.realityFabric.value.log10() ** 0.1 / 15,
    formatEffect: value => `+${format(value, 2, 3)}`
  },
  {
    name: "Generated Glyphs",
    id: 10,
    cost: 50,
    description: "Reality Fabric boosts Glyph Level",
    effect: () => {
      let e = Currency.realityFabric.value;
      for (let i = 1; e.gte(i * 500); i++) {
        e = e.sub(i * 500);
        e = e.sqrt();
        e = e.add(i * 500);
      }
      return e.toNumber();
    },
    formatEffect: value => `+${format(value, 2, 2)}`
  },
  {
    name: "Recreated Rarities",
    id: 11,
    cost: 50,
    description: "Reality Fabric increases Glyph rarity",
    effect: () => {
      let e = Currency.realityFabric.value.clampMin(1).ln() / 10;
      if (e >= 25) e = 25 + Math.cbrt(e - 25);
      return e;
    },
    formatEffect: value => `+${format(value, 2, 2)}`
  },
  rebuyable({
    name: "Speed Surge",
    id: 12,
    initialCost: 1,
    costMult: 1e3,
    description: "Gain a multiplier to game speed",
    effect: p => (1 + Currency.realityFabric.value.log10() / 1000) ** p,
    formatEffect: value => formatX(value, 2, 2)
  })
];