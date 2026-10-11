// Demoen øverst: feltene i panelet fylles inn i dokumentet når man trykker "Sett inn".
// Det er tre eksempler i faner. Hvert eksempel fungerer for seg.
(function () {
  // Samme regler som i Word-tillegget: datoen vises på norsk i dokumentet,
  // og tallfelt tar bare imot tall, med ett komma eller punktum.
  function formatDate(isoDate) {
    if (!isoDate) return "";
    return new Date(isoDate + "T00:00:00").toLocaleDateString("nb");
  }

  function limitToNumbers(input) {
    var lastValid = input.value;
    input.addEventListener("input", function () {
      if (/^-?\d*[.,]?\d*$/.test(input.value)) {
        lastValid = input.value;
      } else {
        input.value = lastValid;
      }
    });
  }

  function setUpExample(example) {
    var form = example.querySelector("form");
    var reset = form.querySelector(".link");
    var slots = Array.from(example.querySelectorAll(".doc [data-field]"));
    var placeholders = slots.map(function (slot) {
      return { text: slot.textContent, className: slot.className };
    });

    Array.from(form.querySelectorAll("[data-numeric]")).forEach(limitToNumbers);

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
      form.elements[0].focus();
    });
  }

  function setUpTabs(tabList) {
    var tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));

    function select(tab, moveFocus) {
      tabs.forEach(function (other) {
        var selected = other === tab;
        other.setAttribute("aria-selected", String(selected));
        other.tabIndex = selected ? 0 : -1;
        document.getElementById(other.getAttribute("aria-controls")).hidden = !selected;
      });
      if (moveFocus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        select(tab, false);
      });
      tab.addEventListener("keydown", function (event) {
        var step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
        if (step) {
          event.preventDefault();
          select(tabs[(i + step + tabs.length) % tabs.length], true);
        } else if (event.key === "Home" || event.key === "End") {
          event.preventDefault();
          select(event.key === "Home" ? tabs[0] : tabs[tabs.length - 1], true);
        }
      });
    });
  }

  Array.from(document.querySelectorAll(".example")).forEach(setUpExample);
  Array.from(document.querySelectorAll('[role="tablist"]')).forEach(setUpTabs);
})();
