# Corregir Schwerpunkte de Dr. Marko Ständer

Su biografía oficial ya está correcta, pero los "Schwerpunkte" (y la etiqueta de especialidad que se muestra en la tarjeta del listado) incluyen formulaciones que no aparecen en el texto oficial.

## Estado actual

Focus:
- Interventionelle Kryotherapie der Facettengelenke
- Innovative Verfahren bei Rückenschmerz
- Neurochirurgie der Wirbelsäule

Solo el primero está literalmente respaldado por la biografía; los otros dos son generalizaciones nuestras.

## Cambio propuesto

Dejar únicamente los focos que se derivan directamente del texto oficial:

- Interventionelle Kryotherapie der Facettengelenke der Wirbelsäule
- Innovative Behandlungsverfahren bei Rückenschmerz (klinisch und wissenschaftlich)
- Berg- und Expeditionsmedizin

Las etiquetas de especialidad se mantienen en "Neurochirurgie" y "Wirbelsäulenchirurgie", que corresponden a su formación como Facharzt für Neurochirurgie y a la actividad del centro.

## Detalle técnico

Editar únicamente el array `focus` de la entrada `marko-staender` en `src/lib/doctors.ts`. No se toca la biografía, la foto, el Werdegang ni ningún otro perfil. Las traducciones EN se generan desde `src/lib/doctor-localization.ts`; si allí hay overrides para estos textos, se actualizan en paralelo.
