// Demoen øverst: feltene i panelet fylles inn i dokumentet når man trykker "Sett inn".
(function () {
  var form = document.getElementById("demo");
  var reset = document.getElementById("demo-reset");
  var slots = Array.from(document.querySelectorAll(".doc [data-field]"));
  var placeholders = slots.map(function (slot) {
    return { text: slot.textContent, className: slot.className };
  });

  // Samme regler som i Word-tillegget: datoen vises på norsk i dokumentet,
  // og beløpsfeltet tar bare imot tall, med ett komma eller punktum.
  function formatDate(isoDate) {
    if (!isoDate) return "";
    return new Date(isoDate + "T00:00:00").toLocaleDateString("nb");
  }

  var amount = form.elements.belop;
  var lastValidAmount = amount.value;
  amount.addEventListener("input", function () {
    if (/^-?\d*[.,]?\d*$/.test(amount.value)) {
      lastValidAmount = amount.value;
    } else {
      amount.value = lastValidAmount;
    }
  });

  function showPlaceholder(slot, i) {
    slot.className = placeholders[i].className;
    slot.textContent = placeholders[i].text;
  }

  function showValue(slot, value) {
    slot.textContent = value;
    // Fjern og legg til klassen igjen, så animasjonen spilles av hver gang.
    slot.className = "";
    void slot.offsetWidth;
    slot.className = "filled";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    slots.forEach(function (slot, i) {
      var input = form.elements[slot.dataset.field];
      var value = input.type === "date" ? formatDate(input.value) : input.value.trim();
      if (value) showValue(slot, value);
      else showPlaceholder(slot, i);
    });
    reset.hidden = false;
  });

  reset.addEventListener("click", function () {
    slots.forEach(showPlaceholder);
    reset.hidden = true;
    form.elements.navn.focus();
  });
})();
