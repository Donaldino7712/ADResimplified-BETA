<script>
import ResetModal from "@/components/modals/prestige/ResetModal";

export default {
  name: "EternityModal",
  components: {
    ResetModal
  },
  data() {
    return {
      exitingEC: false,
      startingIP: new Decimal(),
      gainedEternityPoints: new Decimal(),
      gainedEternities: new Decimal()
    };
  },
  computed: {
    message() {
      return `Eternity will reset everything except Achievements, Challenge records,
        and anything under the General header on the Statistics tab.`;
    },
    gainedEPOnEternity() {
      return PlayerProgress.eternityUnlocked()
        ? `You will gain ${quantify("Eternity", this.gainedEternities, 2)} 
      and ${quantify("Eternity Point", this.gainedEternityPoints, 2)} on Eternity.`
        : `You will gain ${quantify("Eternity", this.gainedEternities, 2)}, 
      ${quantify("Eternity Point", this.gainedEternityPoints, 2)} and unlock various upgrades on Eternity.`;
    },
    startWithIP() {
      return this.startingIP.gt(0)
        ? `You will start your next Eternity with ${quantify("Infinity Point", this.startingIP, 2)}.`
        : ``;
    },
    eternityChallenge() {
      const ec = EternityChallenge.current;
      if (ec.isFullyCompleted) {
        return `Eternity Challenge ${ec.id} is already fully completed.`;
      }
      const gainedCompletions = ec.gainedCompletionStatus.gainedCompletions;
      return `You will gain ${quantifyInt("completion", gainedCompletions)} for Eternity Challenge ${ec.id}.`;
    }
  },
  methods: {
    update() {
      this.exitingEC = EternityChallenge.isRunning;
      this.startingIP = Currency.infinityPoints.startingValue;
      this.gainedEternityPoints = gainedEternityPoints();
      this.gainedEternities = gainedEternities();
    },
    handleYesClick() {
      animateAndEternity();
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ResetModal
    :header="exitingEC ? 'Complete Eternity Challenge' : 'You are about to Eternity'"
    :message="message"
    :gained-resources="gainedEPOnEternity"
    :starting-resources="startWithIP"
    :confirm-fn="handleYesClick"
    :alternate-condition="exitingEC"
    :alternate-text="exitingEC ? eternityChallenge : undefined"
    confirm-option="eternity"
  />
</template>
