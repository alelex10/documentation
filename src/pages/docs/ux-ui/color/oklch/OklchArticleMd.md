
# ¿Qué es OKLCH?

## Definición
El espacio de color **OKLCH** es una representación de color basada en el espacio **Oklab**, un sistema perceptualmente uniforme donde:
- Las diferencias en valores reflejan proporcionalmente diferencias en la percepción humana.
- Combina precisión computacional con linealidad en percepción de luminosidad.

---

## Componentes del formato OKLCH
El formato se escribe como:  
`oklch(L C H)` o `oklch(L C H / alfa)`.

### 1. L (Luminancia)  
- **Rango**: 0 (negro) a 1 (blanco).  
- Define la brillantez percibida. Ej:  
  ```css
  background-color: oklch(0.6 0.3 240);
  ```

### 2. C (Croma)  
- **Rango**: 0 (gris) a +∞ (máximo croma disponible en el espacio).  
- Controla la saturación. Valores altos = colores vibrantes.  
- Ejemplo comparativo:  
  ```css
  .saturado { oklch(0.5 0.8 240) }  
  .pastel { oklch(0.5 0.2 240) }
  ```

### 3. H (Tonos)  
- **Rango**: 0° (rojo) a 360° (espectral).  
- Escala cromática:  
  <table>
    <tr>
      <th>Grados</th>
      <th>Color primario</th>
    </tr>
    <tr>
      <td>0°</td>
      <td>Rojo</td>
    </tr>
    <tr>
      <td>120°</td>
      <td>Verde</td>
    </tr>
    <tr>
      <td>240°</td>
      <td>Azul</td>
    </tr>
  </table>

### 4. Alfa (opcional)  
- **Rango**: 0 (transparente) a 1 (opaco).  
- Permite definir la transparencia:  
  ```css
  background-color: oklch(0.7 0.6 30 / 0.8);
  ```

---

## Ventajas de OKLCH
- ✅ **Perceptualmente uniforme**: Modificar un valor produce cambios visuales consistentes.
- ✅ **Independencia lumínica**: La luminancia (L) se diferencia del brillo en espacios como HSL.
- ✅ Optimizado para cálculos: Operaciones de mezcla de colores producen resultados predecibles.

---

## Uso práctico
### Ejemplo completo
```css
.color-ejemplo {
  background-color: oklch(0.6 0.3 240); /* Azul suave */
}

.fondo-semi-transparente {
  background-color: oklch(0.8 1.2 60 / 0.5); /* Naranja translúcido */
}
```

### Flujo de trabajo
1. Define **L** para el equilibrio oscuro-claro.
2. Ajusta **C** para saturación.
3. Rota **H** en el círculo cromático.
4. Usa **alfa** para capas de transparencia.

---

## Comparación con HSL
| Parámetro | HSL               | OKLCH              |
|----------|-------------------|--------------------|
| Luminosidad | Influenciada por el tono | Independiente y lineal |
| Saturación | Basado en blanco/negro | Basado en croma realista |
| Espacio  | Colorimétrico no uniforme | Perceptualmente Uniforme |

## Links de referencia
[Comparacion de gradiantes oklch y hsl](https://full-stack-plus.github.io/oklch-examples/)