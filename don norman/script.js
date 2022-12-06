	<script>
			let mainContent = document.querySelector('#secondary_content');
			let secondaryContent = document.querySelector('#main_content');
			let is = document.getElementById('IS');
			let isnt = document.getElementById('ISNT');
			let switchdiv = document.getElementById('switch');
			let ref_line = document.getElementById('line');
			window.onscroll = function () { sticker() };
			document.querySelector('.switch input').addEventListener('change', e => {
				mainContent.style.display = e.target.checked ? 'block' : 'none';
				secondaryContent.style.display = e.target.checked ? 'none' : 'block';
				isnt.style.display = e.target.checked ? 'block' : 'none';
				is.style.display = e.target.checked ? 'none' : 'block';
			});
		</script>