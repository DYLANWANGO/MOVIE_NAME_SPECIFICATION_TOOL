// 对datalist在html5中的样式进行自定义

(() => {
    let t;

    function e(t) {
        t && t.shown && (t.style.display = 'none', t.shown = !1)
    }

    function n(t) {
        const e = c(t);
        if (!e || !e.datalist) return;
        const n = e.value.trim().toLowerCase();
        Array.from(e.datalist.getElementsByTagName('option')).forEach((t => {
            t.setAttribute('tabindex', 0), t.style.display = !n || t.value.toLowerCase().includes(n) ? 'block' : 'none'
        }))
    }

    function i(t) {
        const n = c(t);
        if (n && n.datalist) switch (t.keyCode) {
            case 40: {
                let t = n.datalist.firstElementChild;
                t.offsetHeight || (t = a(t, 1)), t && t.focus();
                break
            }
            case 9:
                e(n.datalist);
                break;
            case 13:
            case 32:
                l(t)
        }
    }

    document.body.addEventListener('focusin', (function (s) {
        const a = c(s);
        if (!a) return;
        if (a.list) {
            const t = a.list;
            a.datalist = t, a.removeAttribute('list'), t.input = a, t.setAttribute('tabindex', -1), a.addEventListener('input', n), a.addEventListener('keydown', i), t.addEventListener('keydown', o), t.addEventListener('click', l)
        }
        const r = a.datalist;
        r && !r.shown && (e(t), r.shown = !0, n(s), r.style.width = a.offsetWidth + 'px', r.style.left = a.offsetLeft + 'px', r.style.display = 'block', t = r)
    }));
    const s = {33: -12, 34: 12, 38: -1, 40: 1};

    function o(t) {
        const n = c(t);
        if (!n) return;
        const i = t.keyCode, o = s[i], r = n.parentElement;
        if (o) {
            let e = a(n, o);
            e && e.focus(), t.preventDefault()
        } else 9 === i || 13 === i || 32 === i ? l(t) : 8 === i ? r.input.focus() : 27 === i && e(r)
    }

    function a(t, e) {
        let n = t;
        do {
            e < 0 ? n = n.previousElementSibling : e > 0 && (n = n.nextElementSibling), n && n.offsetHeight && (t = n, e -= Math.sign(e))
        } while (n && e);
        return t
    }

    function l(t) {
        const n = c(t), i = n && n.parentElement;
        i && i.input && (i.input.value = n && n.value || '', e(i))
    }

    function c(t) {
        return t && t.target
    }
})();
