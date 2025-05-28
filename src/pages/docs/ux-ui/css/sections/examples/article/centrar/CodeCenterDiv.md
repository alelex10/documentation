```css
<section>
	<div class="conteiner">
		<div class="box__center"></div>
	</div>
</section>
<style>
    .conteiner {
        width: 300px;
        height: 300px;
        background-color: #333;
        /* Forma 1 */
        /* display: flex; */
        /* justify-content: center; */

        /* Forma 2 */
        position: relative;
        align-items: center;
    }
    .box__center {
        /* Forma 2 */
        position: absolute;
        top: 50%;
        left: 50%;
/* se mueve en referecia a su posicion */
        transform: translate(-50%, -50%);

        width: 100px;
        height: 100px;
        background-color: #fff;
    }
</style>
```