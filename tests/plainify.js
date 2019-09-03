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
	});

	QUnit.test('plainify правильно работает с пустым объектом', function (assert) {
		assert.deepEqual(plainify({}), {});

		const nested = {
			'paws': 4,
			'tail': {
				'color': 'black',
				length: {

				},
			},
		};

		const plain = {
			'paws': 4,
			'tail.color': 'black',
		};

		assert.deepEqual(plainify(nested), plain);
	});
	QUnit.test('plainify правильно работает с простым свойством и вложенным объектом', function (assert) {
		const nested = {
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

		const plain = {
			'country.name': 'Russia',
			'country.city.name': 'Moscow',
			'country.city.region.name': 'Izmaylovo',
			'country.city.region.street.name': 'Izmaylovskiy prospekt',
		};

		assert.deepEqual(plainify(nested), plain);

	});

	QUnit.test('plainify правильно работает со свойствами-строками', function (assert) {
		const nested = {
			'paws': 4,
			'tail': {
				'color': 'black',
				length: 2,
			},
		};

		const plain = {
			'paws': 4,
			'tail.color': 'black',
			'tail.length': 2,
		};

		assert.deepEqual(plainify(nested), plain);
	});

	QUnit.test('plainify правильно работает со свойствами-числами', function (assert) {

		const nested = {
			'first': 1,
			'2': {
				'3': 3,
				4: 4,
			},
			5:5,
		};

		const plain = {
			'first': 1,
			'2.3': 3,
			'2.4': 4,
			'5': 5,
		};

		assert.deepEqual(plainify(nested), plain);
	});

	QUnit.test('plainify правильно работает с объектом с одним свойством', function (assert) {
		assert.deepEqual(plainify({hi: 'hello'}), {'hi': 'hello'});
	});
});
