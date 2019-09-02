'use strict';

QUnit.module('Тестируем функцию plainify', function () {
	QUnit.test('plainify работает правильно', function (assert) {
		assert.deepEqual(plainify({foo: 'bar', baz: 42}), {'foo': 'bar', 'baz': 42});

		const nested1 = {
			deep: {
				foo: 'bar',
				baz: 42
			}
		};

		const plain1 = {
			'deep.foo': 'bar',
			'deep.baz': 42
		};

		assert.deepEqual(plainify(nested1), plain1);

		const nested2 = {
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42
						}
					}
				}
			}
		};

		const plain2 = {
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42
		};

		assert.deepEqual(plainify(nested2), plain2);

		const nested3 = {
			paws: 4,
			tail: {
				color: 'black',
				length: 2,
			},
			age: 5,
			family: {
				brother: 'Fluff',
				mother: 'Puff',
			},
		};

		const plain3 = {
			'paws': 4,
			'tail.color': 'black',
			'tail.length': 2,
			'age': 5,
			'family.brother': 'Fluff',
			'family.mother': 'Puff',
		};

		assert.deepEqual(plainify(nested3), plain3);

		const nested4 = {
			country: {
				name: 'Russia',
				city: {
					name: 'Moscow',
					region: {
						name: 'Izmaylovo',
						street: {
							name: 'Izmaylovskiy prospekt'
						}
					}
				}
			}
		};

		const plain4 = {
			'country.name': 'Russia',
			'country.city.name': 'Moscow',
			'country.city.region.name': 'Izmaylovo',
			'country.city.region.street.name': 'Izmaylovskiy prospekt',
		};

		assert.deepEqual(plainify(nested4), plain4);

		const nested5 = {
			'paws': 4,
			'tail': {
				'color': 'black',
				length: 2,
			},
		};

		const plain5 = {
			'paws': 4,
			'tail.color': 'black',
			'tail.length': 2,
		};

		assert.deepEqual(plainify(nested5), plain5);

		assert.deepEqual(plainify({}), {});

		const nested6 = {
			'first': 1,
			'2': {
				'3': 3,
				4: 4,
			},
			5:5,
		};

		const plain6 = {
			'first': 1,
			'2.3': 3,
			'2.4': 4,
			'5': 5,
		};

		assert.deepEqual(plainify(nested6), plain6);

		const nested7 = {
			'paws': 4,
			'tail': {
				'color': 'black',
				length: {

				},
			},
		};

		const plain7 = {
			'paws': 4,
			'tail.color': 'black',
		}

		assert.deepEqual(plainify(nested7), plain7);
	});
});
