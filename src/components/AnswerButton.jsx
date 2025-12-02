import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AnswerButton({ text, onPress, disabled, correct, selected }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        selected && styles.selected,
        correct === true && styles.correct,
        correct === false && styles.wrong,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#eee",
    alignItems: "center",
  },
  text: { fontSize: 16, fontWeight: "600" },
  selected: { borderWidth: 2, borderColor: "#666" },
  correct: { backgroundColor: "#c8f7c5" },
  wrong: { backgroundColor: "#f7c5c5" },
});
